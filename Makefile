.PHONY: run node_module
node_module:
	pnpm i

run: node_module
	pnpm dev
