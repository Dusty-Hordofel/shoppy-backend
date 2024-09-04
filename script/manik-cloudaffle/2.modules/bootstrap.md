Dans le contexte de NestJS, le terme **"bootstrap"** fait référence au processus de démarrage de l'application. C'est l'étape où NestJS initialise et configure l'application en utilisant les modules définis, prépare l'environnement d'exécution, et démarre le serveur pour accepter les requêtes.

Voici une explication détaillée de ce processus :

### 1. **Initialisation de l'Application**

Lorsque vous exécutez votre application NestJS, NestJS commence par le fichier `main.ts`. Ce fichier contient le code nécessaire pour démarrer l'application. Le processus de bootstrap se compose généralement des étapes suivantes :

- **Création de l'Instance de l'Application :**
  Vous utilisez `NestFactory` pour créer une instance de l'application NestJS. Cette instance est ensuite configurée avec les modules principaux définis dans `AppModule`.

  ```typescript
  const app = await NestFactory.create(AppModule);
  ```

- **Configuration de l'Application :**
  Après avoir créé l'instance, vous pouvez configurer certaines options pour votre application, comme le port d'écoute, les middleware, les pipes globaux, etc.

  ```typescript
  app.setGlobalPrefix("api"); // Exemple pour ajouter un préfixe global aux routes
  ```

- **Démarrage du Serveur :**
  Une fois l'application configurée, vous demandez à NestJS de démarrer le serveur sur un port spécifié, ce qui permet à l'application de commencer à accepter les requêtes HTTP.

  ```typescript
  await app.listen(3000);
  ```

### 2. **Comprendre la Fonction `bootstrap`**

La fonction `bootstrap` est généralement définie comme une fonction asynchrone dans `main.ts`. Cette fonction englobe tout le processus de démarrage :

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 3. **Rôle des Modules**

- **AppModule :**
  `AppModule` est le module principal de votre application. Il regroupe et configure tous les autres modules, contrôleurs, services, et providers nécessaires à votre application. C’est le point central de votre configuration NestJS.

- **Autres Modules :**
  Les autres modules que vous créez pour votre application doivent être inclus dans `AppModule` pour que NestJS les reconnaisse et les charge lors du démarrage.

### 4. **Objectif du Bootstrap**

Le but du processus de bootstrap est de préparer l'environnement d'exécution de votre application et de s'assurer que tout est correctement configuré avant de commencer à recevoir des requêtes. Cela inclut :

- Charger et configurer les modules nécessaires.
- Initialiser les dépendances.
- Configurer le serveur HTTP.
- Préparer les routes et les middlewares.

### 5. **Exemple Pratique**

Voici un exemple simple de ce à quoi pourrait ressembler le fichier `main.ts` dans une application NestJS :

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
```

Dans cet exemple :

- `NestFactory.create(AppModule)` : Crée l'instance de l'application en utilisant `AppModule`.
- `app.setGlobalPrefix('api')` : Définit un préfixe global pour toutes les routes.
- `app.listen(3000)` : Démarre le serveur sur le port 3000.

En résumé, **"bootstrap"** dans NestJS est le processus qui configure et démarre l'application en utilisant les modules et les paramètres définis, permettant à l'application de commencer à fonctionner et à répondre aux requêtes.
