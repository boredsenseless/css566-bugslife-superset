/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { NativeFilterType } from '@superset-ui/core';
import { transformFilterForSave } from './filterTransformer';
import { NativeFiltersFormItem } from '../types';

const baseFormItem: NativeFiltersFormItem = {
  name: 'Test Filter',
  filterType: 'filter_select',
  scope: {
    rootPath: ['ROOT_ID'],
    excluded: [],
  },
  dataset: { value: 1 },
  column: 'country',
  controlValues: {},
  defaultDataMask: {},
  dependencies: [],
  type: NativeFilterType.NativeFilter,
};

test('transformFilterForSave includes titleLabel when set', () => {
  const formItem: NativeFiltersFormItem = {
    ...baseFormItem,
    titleLabel: 'West Coast Region',
  };

  const result = transformFilterForSave('filter_1', formItem);

  expect(result).toMatchObject({
    titleLabel: 'West Coast Region',
  });
});

test('transformFilterForSave omits titleLabel when not provided', () => {
  const result = transformFilterForSave('filter_1', baseFormItem);

  expect((result as { titleLabel?: string })?.titleLabel).toBeUndefined();
});

test('transformFilterForSave treats empty string titleLabel as undefined', () => {
  const formItem: NativeFiltersFormItem = {
    ...baseFormItem,
    titleLabel: '',
  };

  const result = transformFilterForSave('filter_1', formItem);

  expect((result as { titleLabel?: string })?.titleLabel).toBeUndefined();
});

test('transformFilterForSave preserves other filter properties when titleLabel is set', () => {
  const formItem: NativeFiltersFormItem = {
    ...baseFormItem,
    titleLabel: 'My Custom Label',
  };

  const result = transformFilterForSave('filter_1', formItem);

  expect(result).toMatchObject({
    id: 'filter_1',
    name: 'Test Filter',
    filterType: 'filter_select',
    titleLabel: 'My Custom Label',
  });
});
