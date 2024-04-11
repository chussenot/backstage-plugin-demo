# 🦮 A Guide to Custom Backstage Plugins

Welcome to the Backstage Plugin Development Guide. This comprehensive guide is designed to take you through the journey of creating, enhancing, and deploying a Backstage application, step by step. Whether you're new to Backstage or looking to deepen your understanding and skills, this guide provides clear instructions, best practices, and tips for building a robust Backstage plugins.

By following this guide, you'll learn how to leverage Backstage to its full potential, from setting up your initial application with your app to deploying it within a Dockerized environment.

![Screenshot](https://0x0.st/X-ri.png)

Below is an overview of the steps you'll encounter throughout this guide:

1.  **Create the App**: Initialize your Backstage application by creating a new app instance. This is your starting point in the world of Backstage development.

2.  **Update to Latest**: Ensure your application is up-to-date with the latest Backstage versions to take advantage of new features and improvements.

3.  **Add Frontend Plugin**: Extend your application's functionality by adding a frontend plugin. Learn how to integrate new features seamlessly into the Backstage interface.

4.  **Write Some CI Blocks and Declare Them**: Dive deeper into Backstage's capabilities by writing CI blocks for automation and declaring them within your application.

5.  **Use Backstage Core Components**: Enhance your application's UI and UX by utilizing Backstage's core components, making your developer portal more intuitive and user-friendly.

6.  **Create a Backend Plugin**: Develop a backend plugin to add server-side logic to your application, enabling more complex operations and data management.

7.  **Dockerize It**: Prepare your application for deployment by Dockerizing it. Learn how to containerize your Backstage application for easier distribution and deployment.

Each step is designed to build upon the previous, gradually increasing in complexity and depth. By the end of this guide, you'll have a fully functional, Dockerized Backstage application ready for deployment.

```bash
$ git clone git@github.com:chussenot/backstage-plugin-demo.git
$ cd backstage-plugin-demo
$ git branch
  steps/010-create-app
  steps/020-update-to-latest
  steps/030-add-frontend-plugin
  steps/040-write-some-ci-blocks-and-declare-them
  steps/050-use-backstage-core-components
  steps/060-create-a-backend-plugin
  steps/070-dockerize-it
* trunk
```

You can follow the step-by-step guide or check out the branches to progress through the exercise. It's up to you, depending on what you want and the difficulties you might encounter.

## 1. Create the App

### Prerequisites

Backstage is a mix of technology... You'll need:

- Node.js
- Yarn
- Docker (for building and running Docker images)
- Volta (for managing Node.js and Yarn versions)
- Make

The provided [`Makefile`](./Makefile) offers a structured approach to managing various development tasks for a Backstage application. To start with, let's create an application <3

The `create-app` target initializes a new Backstage application in the specified directory. This step uses the `@backstage/create-app` package to scaffold the application structure, skipping the installation of dependencies for faster setup.

You can use `make setup` to install dependencies as required. Ignore this step if you already have a working nodejs configuration on your laptop.

### Usage

`make create-app`

### Details

This make target runs the `npx @backstage/create-app@latest` command with the `--path` option set to the current application folder and the `--skip-install` option to bypass the dependency installation process. The directory for the new application is defined by the `APPLICATION_FOLDER` variable.

Okay, you've just avoided seeing `yarn` taking down packages from all over the world... But at some point you're going to have to do a `yarn install`...

### Additional Targets

So I've included a few other tragets in the Makefile that are really useful...

- `setup`: Prepares the development environment by installing necessary tools and setting appropriate versions for Node.js and Yarn using Volta.
- `dev`: Starts the backend and frontend servers concurrently for local development.
- `build`: Builds a Docker image for the application, tagging it with the `DOCKER_IMAGE_NAME` specified.
- `lint`, `test`, `tsc`, `prettier-check`: Various utility targets for code quality and correctness.

### Let's move in the branches...

If you do a checkout of `git checkout steps/010-create-app` you can see the result...

It's also directly visible on Github: [https://github.com/chussenot/backstage-plugin-demo/tree/steps/010-create-app](https://github.com/chussenot/backstage-plugin-demo/tree/steps/010-create-app)

## 2. Update to latest Backstage version

Let's move again to the step 2...

`git checkout co steps/020-update-to-latest`

I'll let you have a look at all the `Makefile` targets, they'll come in handy in few minutes.

### Usage

`make bump-backstage`

### Details

This target executes the `backstage-cli versions:bump` command within the context of the application folder, as specified by the `APPLICATION_FOLDER` variable. This command checks for the latest versions of Backstage packages and updates the project's `package.json` accordingly.

Bravo, You've got a fresh application to start your developments.

## 3. Add Frontend Plugin

OK, so now let's try to find something we can display and offer to our developers. For example, we'd like them to see _reusable blocks_ for continuous integration chains. Is that OK?

We'll create a new plugin called `backstage-plugin-building-blocks`. How to add the plugin to your application, scaffold the plugin structure?

### Step 1: Adding the Plugin to Your Backstage App

Run, `make create-plugin-frontend` and name it... **building-blocks**

This, will update the `package.json` of the Backstage app to include the `backstage-plugin-building-blocks` as a dependency. This step is the starting point for making the plugin available within your Backstage instance.

```json
"dependencies": { "backstage-plugin-building-blocks": "^0.1.0" }
```

### Step 2: Registering the Plugin in Your App

Next, this command also modified the `App.tsx` file to include and route to the `BuildingBlocksPage` component provided by the plugin. This step integrates the plugin into the app's navigation, allowing users to access the plugin's UI.

```tsx
import { BuildingBlocksPage } from "backstage-plugin-building-blocks";
const routes = (
  <FlatRoutes>
    {" "}
    ... <Route path="/building-blocks" element={<BuildingBlocksPage />} />{" "}
  </FlatRoutes>
);
```

### Step 3: Scaffolding the Plugin

Configuration files like `.eslintrc.js` and `package.json`, and development setup under the `dev` directory. This scaffolding is essential for developing the plugin in isolation and integrating it with the Backstage ecosystem.

It's up to you whether you want to operate in isolation or not.

### Step 4: Implementing Components

When you scaffold a plugin, you have 2 react components by default, `ExampleComponent` and `ExampleFetchComponent`, along with their respective tests. These components demonstrate how to create UI elements and fetch data within a plugin, serving as a foundation for further development. The structure of frontend plugins is explain [here](https://backstage.io/docs/plugins/structure-of-a-plugin).

- The `ExampleComponent` provides a basic UI structure, including a header, a content area, and an information card.
- The `ExampleFetchComponent` illustrates how to fetch and display data in a table format, including handling loading states and errors.

You can start from this base and rename things to suit the needs of your interface.

### Step 5: The Plugin Integration

Lastly, the plugin's `index.ts` to export the main plugin object and the `BuildingBlocksPage` component. This step finalizes the plugin's public API, making it usable within the Backstage app ...and by other plugins ;).

```
export { buildingBlocksPlugin, BuildingBlocksPage } from './plugin';
```

More about [plugin development](https://backstage.io/docs/plugins/plugin-development) and [composability](https://backstage.io/docs/plugins/composability) is avaible on the official documentation.

## 4. Write Some CI Blocks and Declare Them

Let's move on to the next branch.
`git checkout steps/040-write-some-ci-blocks-and-declare-them`

Imagine reusable CI blocks on Github, for example...

### Enhancing the Backstage App with Reusable Workflows

To manipulate data, we're going to use the software catalog, which is part of Backstage's core functionality. And we're going to load that into the database.

#### Step 1: Configuring the Catalog

Let's define a new type of catalog entity to your Backstage app to handle GitHub Actions workflows as resources. This is done in the `app-config.yaml` file, where you've specified a new location for catalog entities:

```
catalog:
  locations:
    - type: file
    - target: ../../examples/workflows/all.yaml
    - rules:
      - allow: [Resource]
```

This change tells Backstage to include the GitHub Actions workflows defined in `examples/workflows/all.yaml` as part of its catalog, treating them as resources. This is an essential step for making these workflows discoverable and manageable within your Backstage instance.

#### Step 2: Defining GitHub Actions Workflows

You've created a new file, `examples/workflows/all.yaml`, where you define two GitHub Actions workflows as resources. These definitions include metadata like the name, description, tags, and specific GitHub-related information, such as links to documentation or the workflow file path.

This addition allows you to manage and share CI/CD workflows across your organization, making it easier to reuse common workflows in multiple repositories. Your developers will love it!

#### Step 3: Enhancing the UI with a New Sidebar Item

Let's add a link to the page in the menu. In `packages/app/src/components/Root/Root.tsx`, let's create new item to the sidebar navigation:

```tsx
<SidebarItem icon={BuildIcon} to="building-blocks" text="Building Blocks" />
```

#### Step 4: Plugin Documentation

Look at `README.md` file in the `building-blocks` plugin directory. It includes a detailed explanation of managing reusable CI jobs in GitHub, how to create and use reusable workflows, and best practices for CI/CD processes.

#### Step 5: Incorporating Catalog Model API

In `plugins/building-blocks/package.json`, I added a new dependency:

```json
"dependencies":{"@backstage/catalog-model":"^1.4.5"}
```

This change allows the plugin to interact with the Backstage catalog model API, enabling it to retrieve, display, or manipulate the catalog entities representing GitHub Actions workflows.

#### Step 6: Refactoring and Adding New Components

Several components within the `building-blocks` plugin have been refactored, renamed, or newly added, such as changing `ExampleComponent` to `MainComponent` and introducing a `TableComponent`. These changes likely reflect an expansion in the plugin's functionality, possibly to display the GitHub Actions workflows in a tabular format or to provide more detailed information about each workflow.

## 5. Use Backstage Core Components

Well, we've got a prototype... Now let's try and get a backstage design...

### Enhanced User Interaction and Navigation

- The import statement was refined to use React hooks (`useState`, `useEffect`) more efficiently.
- A dialog component was introduced to display detailed information about a selected workflow. This dialog pops up when a user clicks on a row in the table, providing a more detailed view of the workflow's metadata and links.
- Navigation logic was added using `useNavigate` and `useLocation` from `react-router-dom`, allowing users to navigate to a detailed view of a workflow and return back to the list.

### Improved Table Display

- The table now uses the `Table` and `TableColumn` components from `@backstage/core-components` for displaying workflows, replacing the previous manual table rendering. This change leverages Backstage's built-in UI components for consistency and better functionality.
- Columns for the table are defined explicitly, allowing for more control over what information is displayed and how.
- A click handler (`handleRowClick`) was added to each row in the table, triggering the display of the dialog with detailed information for the selected workflow.

### Dialog for Detailed Information

- A new dialog component shows detailed information about the selected workflow, including its description, owner, tags, and relevant links. This feature provides users with a comprehensive view of each workflow without leaving the context of the table.
- The dialog includes actions, such as a close button, enhancing user interaction with the component.

### Designing for Backstage

The Backstage [Storybook](https://backstage.io/docs/dls/contributing-to-storybook) provides you a way to explore reusable Backstage User Interface elements and how to use them in developing the Backstage core and its plugins. 

If you've got some [figma](https://www.figma.com/) pros with you... you should be able to have the interface being redesigned... Is it really useful... it's up to you.

## 6. Create a Backend Plugin

So now let's take a look at what a [backend](https://backstage.io/docs/plugins/backend-plugin) plugin is.

You can create a new one via the Makefile... or simply checkout the branch below.

Run, `make create-plugin-backend` and name it... **building-blocks** or do a `git checkout steps/060-create-a-backend-plugin`

### Dependency and Plugin Registration

- The `backstage-plugin-building-blocks-backend` dependency is added to `packages/backend/package.json`, signifying the inclusion of a new plugin for the backend.
- The `packages/backend/src/index.ts` file is updated to register this new backend plugin, ensuring its services are available to the Backstage app.

### Plugin Setup and Configuration

- The `plugins/building-blocks-backend` directory is created, containing all the necessary files for the backend plugin, including `package.json`, `README.md`, and source code files such as `plugin.ts` and `router.ts`.
- The `package.json` within this new plugin specifies its dependencies, scripts for building and testing, and other metadata like the plugin name and version.
- The `plugin.ts` file exports the `buildingBlocksPlugin` as a backend plugin, which is registered in the Backstage app to provide its functionality.
- The `router.ts` file defines the express router for the plugin, setting up routes for the plugin’s endpoints, such as `/health` and `/building-blocks`, which can be used to check the health of the plugin and to interact with its services.

### Integration with Frontend Components

- The `MainComponent.tsx` file in the `plugins/building-blocks/src/components/MainComponent` directory is updated to interact with the backend plugin. It fetches data from the `/api/blocks/building-blocks` endpoint and displays it, demonstrating how frontend components can utilize the backend plugin’s services.

## 7. Dockerize It

`git checkout steps/070-dockerize-it`

### Dockerfile

- **Multi-Stage Build**: The Dockerfile is now structured into multiple stages, including a yarn install skeleton layer (`packages`), a build stage (`build`), and a final stage that sets up the actual backend image with production dependencies.
- **Dependency Installation**: Both the `build` and final stage install dependencies required for `@backstage/plugin-scaffolder-backend` and optionally for `sqlite3` if it's being used in the application.
- **Build Process**: The build stage runs TypeScript compilation and builds the backend bundle. The results of the build are prepared in a way that only the necessary files are included in the final image to reduce its size.
- **Security and Efficiency**: The use of `node` as the user for running the application and the inclusion of `--frozen-lockfile` flag during `yarn install` commands increase the security and efficiency of the Docker build process.
- **Runtime Configuration**: Environment variables are used to configure the backend at runtime, including a `BACKEND_SECRET` for authentication purposes.

### .dockerignore

- Updated to ensure that unnecessary files (like local configs, node modules, and source files) are not copied into the Docker context, optimizing the build speed and the size of the Docker image.

### Makefile

- A `run` command is added to simplify the process of running the Docker image locally, binding the application to the appropriate port for access.

### app-config.production.yaml

- Updates include backend authentication configuration, presumably to work with the `BACKEND_SECRET` environment variable set in the Dockerfile. This approach allows for secure and flexible configuration of the backend based on the environment it's deployed in.

## Let's wrap-up!

Well... of course the repo is going to move around a bit more... don't hesitate to post MRs if you want to shed some light on this step-by-step guide to customs Backstage plugins.

Cheers,