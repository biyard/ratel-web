'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logger } from '@/lib/logger';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import {
  updateDraftRequest,
  UrlType,
} from '@/lib/api/models/feeds/update-draft-request';
import { Feed, FeedStatus, FeedType } from '@/lib/api/models/feeds';
import { createDraftRequest } from '@/lib/api/models/feeds/create-draft';
import { postByUserIdQk } from '../_hooks/use-posts';
import { checkString } from '@/lib/string-filter-utils';
import { showErrorToast } from '@/lib/toast';
import { route } from '@/route';
import { useUserInfo } from '../_hooks/user';

export type DraftStatus =
  | 'idle'
  | 'loading'
  | 'creating'
  | 'saving'
  | 'publishing'
  | 'saved'
  | 'error';

export interface PostDraftContextType {
  expand: boolean;
  setExpand: (expand: boolean) => void;
  draftId: number | null;
  title: string;
  setTitle: (title: string) => void;
  content: string | null;
  setContent: (content: string | null) => void;
  image: string | null;
  setImage: (image: string | null) => void;
  status: DraftStatus;

  setStatus: (status: DraftStatus) => void;

  publishPost: () => Promise<void>;
  loadDraft: (id: number) => Promise<void>;
  newDraft: () => void;
  saveDraft: (
    title: string,
    content: string | null,
    image: string | null,
  ) => Promise<void>;
}

const PostDraftContext = createContext<PostDraftContextType | undefined>(
  undefined,
);

export const PostDraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { get, post } = useApiCall();
  const { data: user } = useUserInfo();

  const [expand, setExpand] = useState(false);
  const [draftId, setDraftId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<DraftStatus>('idle');

  const lastSavedRef = useRef({
    title: '',
    content: null as string | null,
    image: null as string | null,
  });

  // useEffect(() => {
  //   if (status === 'saved') {
  //     const timer = setTimeout(() => setStatus('idle'), 800);
  //     return () => clearTimeout(timer);
  //   }
  // }, [status]);

  const resetState = useCallback(() => {
    setDraftId(null);
    setTitle('');
    setContent('');
    setImage(null);
    setStatus('idle');
    lastSavedRef.current = { title: '', content: '', image: null };
  }, []);

  const refetchDrafts = useCallback(() => {
    if (user) {
      queryClient.invalidateQueries({
        queryKey: postByUserIdQk(user.id, 1, 20, FeedStatus.Draft),
      });
    }
  }, [user, queryClient]);

  const newDraft = useCallback(() => {
    resetState();
    setExpand(true);
  }, [resetState]);

  const loadDraft = useCallback(
    async (id: number) => {
      setStatus('loading');
      try {
        const draft: Feed = await get(ratelApi.feeds.getFeedsByFeedId(id));

        const draftTitle = draft.title ?? '';
        const draftContent = draft.html_contents ?? '';
        const draftImage =
          draft.url && draft.url_type === UrlType.Image ? draft.url : null;

        setDraftId(draft.id);
        setTitle(draftTitle);
        setContent(draftContent);
        setImage(draftImage);

        lastSavedRef.current = {
          title: draftTitle,
          content: draftContent,
          image: draftImage,
        };

        setExpand(true);
        setStatus('saved');
      } catch (error) {
        logger.error('Failed to load draft:', error);
        setStatus('error');
      }
    },
    [get],
  );

  const saveDraft = useCallback(
    async (
      currentTitle: string,
      currentContent: string | null,
      currentImage: string | null,
    ) => {
      if (!user || status === 'saving' || status === 'creating') return;
      if (!currentTitle.trim() || currentContent === null) return;

      const lastSaved = lastSavedRef.current;
      const isUnchanged =
        currentTitle === lastSaved.title &&
        currentContent === lastSaved.content &&
        currentImage === lastSaved.image;

      if (isUnchanged) return;
      if (checkString(currentTitle) || checkString(currentContent)) {
        showErrorToast('Please remove the test keyword');
        return;
      }

      const isCreating = !draftId;
      setStatus(isCreating ? 'creating' : 'saving');

      try {
        let currentDraftId = draftId;

        if (isCreating) {
          const created: Feed = await post(
            ratelApi.feeds.createDraft(),
            createDraftRequest(FeedType.Post, user.id),
          );
          currentDraftId = created.id;
          setDraftId(currentDraftId);
        }

        if (currentDraftId) {
          const url = currentImage || '';
          const url_type = currentImage ? UrlType.Image : UrlType.None;

          await post(
            ratelApi.feeds.updateDraft(currentDraftId),
            updateDraftRequest(
              currentContent,
              1,
              currentTitle,
              0,
              [],
              url,
              url_type,
            ),
          );

          lastSavedRef.current = {
            title: currentTitle,
            content: currentContent,
            image: currentImage,
          };

          refetchDrafts();
        }

        setStatus('saved');
      } catch (error) {
        logger.error('Error saving draft:', error);
        setStatus('error');
      }
    },
    [draftId, user, post, refetchDrafts, status],
  );

  useEffect(() => {
    if (!title.trim() && !content?.trim()) return;
    if (status !== 'idle') return;

    const {
      title: savedTitle,
      content: savedContent,
      image: savedImage,
    } = lastSavedRef.current;
    const isUnchanged =
      title === savedTitle && content === savedContent && image === savedImage;

    if (isUnchanged || content === null) return;

    const timeout = setTimeout(() => {
      saveDraft(title, content, image);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [title, content, image, status, saveDraft]);

  const publishPost = useCallback(async () => {
    if (
      !user ||
      !draftId ||
      !title.trim() ||
      content == null ||
      status !== 'idle'
    )
      return;
    if (checkString(title) || checkString(content)) {
      showErrorToast('Please remove the test keyword');
      return;
    }

    setStatus('publishing');
    try {
      await saveDraft(title, content, image);
      await post(ratelApi.feeds.publishDraft(draftId), { publish: {} });

      router.push(route.threadByFeedId(draftId));

      resetState();
      setExpand(false);
      refetchDrafts();
      setStatus('saved');
    } catch (error) {
      logger.error('Publish failed:', error);
      setStatus('error');
    }
  }, [
    draftId,
    title,
    content,
    image,
    status,
    user,
    post,
    saveDraft,
    router,
    refetchDrafts,
    resetState,
  ]);

  const contextValue: PostDraftContextType = {
    expand,
    setExpand,
    draftId,
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
    status,
    setStatus,
    publishPost,
    loadDraft,
    newDraft,
    saveDraft,
  };

  return (
    <PostDraftContext.Provider value={contextValue}>
      {children}
    </PostDraftContext.Provider>
  );
};

export const usePostDraft = (): PostDraftContextType => {
  const context = useContext(PostDraftContext);
  if (context === undefined) {
    throw new Error('usePostDraft must be used within a PostDraftProvider');
  }
  return context;
};
