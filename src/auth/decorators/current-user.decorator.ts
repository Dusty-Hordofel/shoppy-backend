import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

// Création d'un décorateur de paramètre pour extraire l'utilisateur (2nd way)
// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext) => {
//     // Extraction de l'objet requête depuis le contexte d'exécution
//     const request = context.switchToHttp().getRequest();
//     // Retourne l'utilisateur extrait de la requête
//     return request.user;
//   },
// );
