/*
 * Copyright (c) 2010, 2023 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipse.scout.widgets.client.services.lookup;

import java.util.Locale;

import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.eclipse.scout.rt.platform.util.date.DateFormatProvider;

@ClassId("e7162e4d-0150-48a4-8852-d1a430866909")
public class LocaleLookupCall extends AbstractLocaleLookupCall {

  private static final long serialVersionUID = -2057181577149853634L;

  @Override
  protected Locale[] availableLocales() {
    return BEANS.get(DateFormatProvider.class).getAvailableLocales();
  }
}
