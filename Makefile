PROJECT_DIR := $(shell pwd)

dev:
	docker build -t nominatim-search-dev --target=dev .
	docker run -it -v "$(PROJECT_DIR):/app" -p 5173:5173 -p 24678:24678 nominatim-search-dev

prod:
	docker build -t nominatim-search .
	docker run -p 3000:3000 nominatim-search

clean:
	docker rmi -f nominatim-search nominatim-search-dev || true
	docker system prune -f
