gcloud config set project cormickjbrowne-portfolio

npm run build

gcloud builds submit --tag us-east1-docker.pkg.dev/cormickjbrowne-portfolio/my-docker-repo/tic-tac-toe-ui

gcloud run deploy tic-tac-toe-ui \
  --image us-east1-docker.pkg.dev/cormickjbrowne-portfolio/my-docker-repo/tic-tac-toe-ui \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated