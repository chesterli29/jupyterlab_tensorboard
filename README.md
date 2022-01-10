# JupyterLab Tensorboard

[![Github Actions Status](https://github.com/chaoleili/jupyterlab_tensorboard/workflows/Build/badge.svg)](https://github.com/chaoleili/jupyterlab_tensorboard/actions/workflows/build.yml)

A JupyterLab extension for TensorBoard.

*Acknowledgement*: the tensorboard backend from [jupyter_tensorboard](https://github.com/lspvic/jupyter_tensorboard) was integrated into this extension.


## Usage


New card in Launcher to create a tensorboard with current working directory as the logdir for tensorboard.

<img src="image/launcher.png" />

Sidebar shows the running tensorboards. 

<img src="image/sidebar.png" />

User can also use Commands to create a tensorboard with inputting the logdir path.

`NOTE: The logdir path should be relative to the jupyterlab's root directory. If not, jupyterlab will return 404 not found error.`


## Requirements

* JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_tensorboard
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_tensorboard
```


## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_tensorboard directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Enable the server extension
jupyter server extension enable jupyterlab_tensorboard
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_tensorboard
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab_tensorboard` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
