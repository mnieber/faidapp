runserver:
	docker-entrypoint.sh strapi develop

debugserver:
	/usr/local/bin/node --inspect=0.0.0.0:9229 --no-lazy /usr/local/bin/strapi develop

create-db:
	env PGPASSWORD=dev psql -h postgres -d postgres -U postgres -c "CREATE USER strapi WITH CREATEDB PASSWORD 'dev';"
	env PGPASSWORD=dev psql -h postgres -d postgres -U strapi -c "CREATE DATABASE strapi;"
	env PGPASSWORD=dev psql -h postgres -d postgres -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;"
