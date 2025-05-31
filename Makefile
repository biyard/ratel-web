
node_module:
	pnpm i

.PHONY: run
run: node_module
	pnpm dev
