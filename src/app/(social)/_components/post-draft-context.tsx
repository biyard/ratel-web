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
  publishPost: () => Promise<void>;
  loadDraft: (id: number) => Promise<void>;
  newDraft: () => void;
}

export const PostDraftContext = createContext<PostDraftContextType | undefined>(
  undefined,
);

export const PostDraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
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

  const { get, post } = useApiCall();
  const { data: user } = useUserInfo();
  const queryClient = useQueryClient();

  const refetchDrafts = useCallback(() => {
    if (!user) return;
    queryClient.invalidateQueries({
      queryKey: postByUserIdQk(user.id, 1, 20, FeedStatus.Draft),
    });
  }, [user, queryClient]);

  const resetState = useCallback(() => {
    setDraftId(null);
    setTitle('');
    setContent('');
    setImage(null);
    setStatus('idle');
    lastSavedRef.current = {
      title: '',
      content: '',
      image: null,
    };
  }, []);

  const newDraft = useCallback(() => {
    resetState();
    setExpand(true);
  }, [resetState]);

  const loadDraft = useCallback(
    async (id: number) => {
      setStatus('loading');
      try {
        const draft: Feed = await get(ratelApi.feeds.getFeedsByFeedId(id));
        const draftTitle = draft.title || '';
        const draftContent = draft.html_contents || '';
        const draftImage =
          draft.url && draft.url_type === UrlType.Image ? draft.url : null;

        setDraftId(draft.id);
        setTitle(draftTitle);
        setImage(draftImage);
        logger.debug('Draft content:', draftContent);
        setContent(draftContent);
        lastSavedRef.current = {
          title: draftTitle,
          content: draftContent,
          image: draftImage,
        };
        setExpand(true);
        logger.debug('Draft loaded:', draft);
      } catch (error: unknown) {
        logger.error('LoadDraft error:', error);
        setStatus('error');
      } finally {
        setStatus('idle');
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
      if (status === 'saving' || status === 'creating' || !user) return;

      if (!currentTitle.trim() || currentContent === null) return;

      const lastSaved = lastSavedRef.current;
      if (
        currentTitle === lastSaved.title &&
        currentContent === lastSaved.content &&
        currentImage === lastSaved.image
      ) {
        return;
      }

      const isCreating = !draftId;
      setStatus(isCreating ? 'creating' : 'saving');

      try {
        let currentDraftId = draftId;
        if (checkString(currentTitle) || checkString(currentContent)) {
          showErrorToast('Please remove the test keyword');
          return;
        }

        if (isCreating) {
          const data: Feed = await post(
            ratelApi.feeds.createDraft(),
            createDraftRequest(FeedType.Post, user.id),
          );
          currentDraftId = data.id;
          setDraftId(currentDraftId);
        }

        if (currentDraftId) {
          let url = '';
          let url_type = UrlType.None;
          if (currentImage) {
            url = currentImage;
            url_type = UrlType.Image;
          }
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

          // Update last saved values
          lastSavedRef.current = {
            title: currentTitle,
            content: currentContent,
            image: currentImage,
          };
        }
        refetchDrafts();
      } catch (error: unknown) {
        logger.error('Save draft error:', error);
        setStatus('error');
      } finally {
        setStatus('idle');
      }
    },
    [draftId, user, post, refetchDrafts, status],
  );

  // Auto-save effect
  useEffect(() => {
    if (!title.trim() && !content?.trim()) return;
    if (status !== 'idle') return;

    const lastSaved = lastSavedRef.current;
    if (
      (title === lastSaved.title &&
        content === lastSaved.content &&
        image === lastSaved.image) ||
      content === null
    ) {
      return;
    }

    const handler = setTimeout(() => {
      saveDraft(title, content, image);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, image, status, saveDraft]);

  const publishPost = useCallback(async () => {
    if (checkString(title) || checkString(content ?? '')) {
      showErrorToast('Please remove the test keyword');
      return;
    }

    if (!draftId || !title.trim() || status !== 'idle' || content == null)
      return;

    setStatus('publishing');
    try {
      await saveDraft(title, content, image);

      await post(ratelApi.feeds.publishDraft(draftId), {
        publish: {},
      });

      router.push(route.threadByFeedId(draftId));

      resetState();
      setExpand(false);
      refetchDrafts();
    } catch (error: unknown) {
      logger.error('Publish error:', error);
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  }, [
    draftId,
    title,
    content,
    image,
    status,
    saveDraft,
    post,
    resetState,
    refetchDrafts,
    router,
  ]);

  const contextValue = {
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
    publishPost,
    loadDraft,
    newDraft,
  };

  return (
    <PostDraftContext.Provider value={contextValue}>
      {children}
    </PostDraftContext.Provider>
  );
};

export const usePostDraft = () => {
  const context = useContext(PostDraftContext);
  if (context === undefined) {
    throw new Error('usePostDraft must be used within a PostDraftProvider');
  }
  return context;
};
