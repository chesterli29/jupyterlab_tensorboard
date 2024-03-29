import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette,
  WidgetTracker,
  IWidgetTracker,
  showDialog,
  Dialog,
  MainAreaWidget
} from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import { TensorboardManager } from './manager';

import { Tensorboard } from './tensorboard';

import { TensorboardTab, OpenLogdirWidget } from './tab';

import { IRunningSessionManagers, IRunningSessions } from '@jupyterlab/running';

import { toArray } from '@lumino/algorithm';

import { LabIcon } from '@jupyterlab/ui-components';

import tensorboardSvgstr from '../style/tensorboard.svg';

export const tensorboardIcon = new LabIcon({
  name: 'jupyterlab_tensorboard:tensorboard',
  svgstr: tensorboardSvgstr
});

/**
 * The command IDs used by the tensorboard plugin.
 */
namespace CommandIDs {
  export const createNew = 'tensorboard:create-new';

  export const inputDirect = 'tensorboard:choose-direct';

  export const open = 'tensorboard:open';

  export const close = 'tensorboard:close';
}

/**
 * Initialization data for the tensorboard extension.
 */
const extension: JupyterFrontEndPlugin<
  IWidgetTracker<MainAreaWidget<TensorboardTab>>
> = {
  id: 'tensorboard',
  requires: [ICommandPalette, IFileBrowserFactory],
  optional: [ILauncher, IMainMenu, IRunningSessionManagers],
  autoStart: true,
  activate
};

export default extension;

function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  browserFactory: IFileBrowserFactory,
  launcher: ILauncher | null,
  menu: IMainMenu | null,
  runningSessionManagers: IRunningSessionManagers | null
): WidgetTracker<MainAreaWidget<TensorboardTab>> {
  const manager = new TensorboardManager();

  const namespace = 'tensorboard';
  const tracker = new WidgetTracker<MainAreaWidget<TensorboardTab>>({
    namespace
  });

  addCommands(app, manager, tracker, browserFactory, launcher, menu);

  if (runningSessionManagers) {
    addRunningSessionManager(runningSessionManagers, app, manager);
  }

  palette.addItem({ command: CommandIDs.inputDirect, category: 'Tensorboard' });

  return tracker;
}

function addRunningSessionManager(
  managers: IRunningSessionManagers,
  app: JupyterFrontEnd,
  manager: TensorboardManager
) {
  managers.add({
    name: 'Tensorboard',
    running: () =>
      toArray(manager.running()).map(model => new RunningTensorboard(model)),
    shutdownAll: () => manager.shutdownAll(),
    refreshRunning: () => manager.refreshRunning(),
    runningChanged: manager.runningChanged
  });

  class RunningTensorboard implements IRunningSessions.IRunningItem {
    constructor(model: Tensorboard.IModel) {
      this._model = model;
    }
    open() {
      app.commands.execute(CommandIDs.open, { tb: this._model });
    }
    icon() {
      return tensorboardIcon;
    }
    label() {
      return `tensorboards/${this._model.name}`;
    }
    shutdown() {
      app.commands.execute(CommandIDs.close, { tb: this._model });
      return manager.shutdown(this._model.name);
    }

    private _model: Tensorboard.IModel;
  }
}

/**
 * Add the commands for the tensorboard.
 */
export function addCommands(
  app: JupyterFrontEnd,
  manager: TensorboardManager,
  tracker: WidgetTracker<MainAreaWidget<TensorboardTab>>,
  browserFactory: IFileBrowserFactory,
  launcher: ILauncher | null,
  menu: IMainMenu | null
): void {
  const { commands, serviceManager } = app;

  commands.addCommand(CommandIDs.open, {
    execute: args => {
      const model = args['tb'] as Tensorboard.IModel;

      // Check for a running tensorboard with the given model.
      const widget = tracker.find(value => {
        return (
          (value.content.tensorboard &&
            value.content.tensorboard.name === model.name) ||
          false
        );
      });
      if (widget) {
        app.shell.activateById(widget.id);
        return widget;
      } else {
        const t = new TensorboardTab({ model });
        const tb = new MainAreaWidget({ content: t });
        tracker.add(tb);
        app.shell.add(tb, 'main');
        app.shell.activateById(tb.id);
        return tb;
      }
    }
  });

  commands.addCommand(CommandIDs.close, {
    execute: args => {
      const model = args['tb'] as Tensorboard.IModel;

      const widget = tracker.find(value => {
        return (
          (value.content.tensorboard &&
            value.content.tensorboard.name === model.name) ||
          false
        );
      });
      if (widget) {
        widget.dispose();
        widget.close();
      }
    }
  });

  commands.addCommand(CommandIDs.inputDirect, {
    label: () => 'Create a new tensorboard',
    execute: args => {
      showDialog({
        title: 'Input the logdir Path to create a new Tensorboard',
        body: new OpenLogdirWidget(),
        buttons: [Dialog.cancelButton(), Dialog.okButton({ label: 'CREATE' })],
        focusNodeSelector: 'inpute'
      }).then(result => {
        if (result.button.label === 'CREATE') {
          const logdir = <string>result.value;
          return app.commands.execute(CommandIDs.createNew, { logdir: logdir });
        } else {
          return;
        }
      });
    }
  });

  commands.addCommand(CommandIDs.createNew, {
    label: args => (args['isPalette'] ? 'New Tensorbaord' : 'Tensorboard'),
    caption: 'Start a new tensorboard',
    icon: args => (args['isPalette'] ? undefined : tensorboardIcon),
    execute: args => {
      const cwd =
        (args['cwd'] as string) || browserFactory.defaultBrowser.model.path;
      const logdir =
        typeof args['logdir'] === 'undefined'
          ? cwd
          : (args['logdir'] as string);
      return serviceManager.contents.get(logdir, { type: 'directory' }).then(
        dir => {
          return manager.startNew(dir.path).then(tb => {
            return app.commands.execute(CommandIDs.open, { tb: tb.model });
          });
        },
        () => {
          // no such directory.
          return showDialog({
            title: 'Cannot create tensorboard.',
            body: 'Directory not found',
            buttons: [Dialog.okButton()]
          });
        }
      );
    }
  });

  if (launcher) {
    launcher.add({
      command: CommandIDs.createNew,
      category: 'Other',
      rank: 2
    });
  }

  if (menu) {
    menu.fileMenu.newMenu.addGroup(
      [
        {
          command: CommandIDs.createNew
        }
      ],
      30
    );
  }
}
