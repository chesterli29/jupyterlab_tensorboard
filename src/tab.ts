import { IFrame } from '@jupyterlab/apputils';

import { Message } from '@lumino/messaging';

import { Tensorboard } from './tensorboard';

import { Widget } from '@lumino/widgets';

const TENSORBOARD_CLASS = 'jp-Tensorboard';

const TENSORBOARD_ICON_CLASS = 'jp-Tensorboards-itemIcon';

/**
 * A widget which manages a tensorboard.
 */
export class TensorboardTab extends IFrame {
  /**
   * Construct a new tensorboard widget.
   */
  constructor(options: TensorboardTab.IOptions) {
    super({ sandbox: ['allow-scripts', 'allow-forms', 'allow-same-origin'] });
    this.addClass(TENSORBOARD_CLASS);
    this.tensorboard = this._tensorboard = options.model;
    this.url = Tensorboard.getUrl(this._tensorboard.name);

    // Initialize settings.
    this.id = `jp-Tensorboard-${Private.nextId()}`;
    this.title.label = `Tensorboard ${this._tensorboard.name}`;
    this.title.icon = TENSORBOARD_ICON_CLASS;
    this.title.closable = true;
    const caption = `Name: Tensorboard ${this._tensorboard.name}\nLogdir: ${this._tensorboard.logdir}`;
    this.title.caption = caption;
  }

  readonly tensorboard: Tensorboard.IModel;

  /**
   * Dispose of the resources held by the tensorboard widget.
   */
  dispose(): void {
    delete this._tensorboard;
    super.dispose();
  }

  protected onCloseRequest(msg: Message): void {
    super.onCloseRequest(msg);
    this.dispose();
  }

  private _tensorboard?: Tensorboard.IModel;
}

export declare namespace TensorboardTab {
  /**
   * Options of the tensorboard widget.
   */
  interface IOptions {
    /**
     * The model of tensorboard instance.
     */
    readonly model: Tensorboard.IModel;
  }
}

/**
 * Widget for inputing tensorboard logdir
 */
export class OpenLogdirWidget extends Widget {
  constructor() {
    super({ node: Private.createOpenNode() });
  }

  /**
   * Get the value of the widget
   */
  getValue(): string {
    return this.inputNode.value;
  }

  /**
   * Get the input text node.
   */
  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
  }
}

namespace Private {
  export function createOpenNode(): HTMLElement {
    const body = document.createElement('div');
    const existingLabel = document.createElement('label');
    existingLabel.textContent = 'Logdir Path:';

    const input = document.createElement('input');
    input.value = '';
    input.placeholder = '/logdir/path/for/tensorboard';

    body.appendChild(existingLabel);
    body.appendChild(input);
    return body;
  }

  let id = 0;

  export function nextId(): number {
    return id++;
  }
}
