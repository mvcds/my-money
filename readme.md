# Experiment: clean architecture + forcing layering with yarn workspace

This repo was created for me to test the "forcing layering with yarn workspace" part of my experiments with "clean architecture".

Something I was writing about on [Code Thoughts](https://medium.com/code-thoughts/stories/published)

## Steps

1. Create package with directories
1. Create domain layer
1. Install things on domain layer `yarn workspace my-domain add faker mocha --dev`
1. The domain layer required factories when references were used within the project
1. Create UC layer
1. Cucumber required a forced "watcher"
1. My editor was having a problem when eslint was not added
1. The need of a proof file was necessary to help me manage complexity i.e. checking if the code was working outside of a testing environment
1. Clean architecture was improved after feedback
1. Create adapters layer
1. Create external layer (web)
1. Web's tests were turn off for faster setup of project
1. The adapter layer was overly complicated, then it was simplified
1. It's possible to see that the data is stored correctly on localStorage` (dev tool's application tab)
1. Some corrections/simplifications were necessary. This is now the base code for future development.
1. Reading information was necessary. This capability was expected and it was expected to touch all layers BUT domain. Everything happened as planned =D

## OBS

* Most packages were created by yarn by running `yarn init -y` in the target folders, the `package.json` was then changed to use a better package name and use version as `0.0.0`
  * The web layer created with `yarn create react-app my-app --template cypress` run on `src` because I was lazy about configuring a react app
* When changing things on dependencies, the layer above does not works
* After creating a new layer, I removed all `node_modules` folders and `yarn.lock` files  (root and workspaces), and rerun `yarn` on the root project - but just because I'm paranoid, you don't need to do it as [things will work ~almost~ all the time](#installing-the-same-dependency-on-same-workspace)
* For this example app, user cannot read projections directly, so there's no use case for it. If more features need this capability while users don't, the way to go is to create a use case for it BUT not an adapter.

## Known issues

### Installing the same dependency on same workspace

By mistake, I have installed the same dependency on the same workspace when I was creating a new layer, this caused `yarn.lock` to lose itself, and it contained duplicated references to the added package.

Installing, itself, didn't present any errors, but when I tried to run tests, they were failing, and all I had was a brand new `yarn-error.log`.

Removing all `node_modules` folders and `yarn.lock` files  (root and workspaces), and running `yarn` at root level fixed the problem.
