# Generator Guidelines

1. **Language & Framework**  
   - Use NestJS (Node.js + TypeScript), TypeORM for Postgres.

2. **Shared SDK Imports**  
   - Always import common DTOs/events from `@express-shipping-room-supply/sdk`.
   - After adding any new entity or event, update `packages/sdk/src/entities.ts` or `events.ts`.

3. **Dockerfile Pattern**  
   - Two-stage build matching the repo root example.

4. **Helm Templating**  
   - Place service charts in `helm/microservices/templates/<service>`.
   - Use the `_helpers.tpl` naming conventions.

5. **Terraform Updates**  
   - If you create a new database, add a new `aws_db_instance` block or a new database name in `infra/terraform/main.tf`.
   - Output its endpoint in `outputs.tf`.

6. **Formatting**  
   - 2-space indent, semicolons, single quotes for JS/TS, alphabetize imports.