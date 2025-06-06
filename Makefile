.PHONY: run node_module
node_module:
	pnpm i

run: node_module
	pnpm dev

build: node_module
	pnpm build
