/*
 * Copyright (c) 2010, 2023 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {Desktop as Desktop_1, DesktopModel as DesktopModel_1, Event, Form, GroupBox, icons, InitModelOf, LabelField, Menu, models, scout} from '@eclipse-scout/core';
import DesktopModel from './DesktopModel';
import {App, DesktopWidgetMap} from '../index';

export class Desktop extends Desktop_1 {
  declare widgetMap: DesktopWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): DesktopModel_1 {
    return models.get(DesktopModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    this.on('logoAction', this._onLogoAction.bind(this));
    let defaultThemeMenu = this.widget('DefaultThemeMenu');
    defaultThemeMenu.on('action', this._onDefaultThemeMenuAction.bind(this));
    let darkThemeMenu = this.widget('DarkThemeMenu');
    darkThemeMenu.on('action', this._onDarkThemeMenuAction.bind(this));
    let denseModeMenu = this.widget('DenseMenu');
    denseModeMenu.on('action', this._onDenseMenuAction.bind(this));

    if (this.theme === 'dark') {
      darkThemeMenu.setIconId(icons.CHECKED_BOLD);
    } else {
      defaultThemeMenu.setIconId(icons.CHECKED_BOLD);
    }
    if (this.dense) {
      denseModeMenu.setIconId(icons.CHECKED_BOLD);
    }
    this.on('propertyChange:dense', event => this.dense ? denseModeMenu.setIconId(icons.CHECKED_BOLD) : denseModeMenu.setIconId(null));
  }

  protected _onDefaultThemeMenuAction(event: Event<Menu>) {
    this.setTheme('default');
  }

  protected _onDarkThemeMenuAction(event: Event<Menu>) {
    this.setTheme('dark');
  }

  protected _onDenseMenuAction(event: Event<Menu>) {
    this.setDense(!this.dense);
  }

  protected _onLogoAction(event: Event<Desktop>) {
    let form = this._createAboutInfoForm();
    form.open();
  }

  protected _createAboutInfoForm(): Form {
    return scout.create(Form, {
      parent: this,
      resizable: false,
      title: 'Scout JS Widgets Application',
      rootGroupBox: {
        objectType: GroupBox,
        borderDecoration: 'empty',
        fields: [{
          objectType: LabelField,
          value: this.session.text('AboutText', App.get().scoutVersion),
          labelVisible: false,
          wrapText: true,
          htmlEnabled: true,
          cssClass: 'about-info',
          statusVisible: false,
          gridDataHints: {
            useUiHeight: true
          }
        }]
      }
    });
  }
}
