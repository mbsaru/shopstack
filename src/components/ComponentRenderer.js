'use client';

import React from 'react';
import { componentMap } from './componentMap';
import { resolveDynamicData } from '@/utils/dynamicValueResolver';
import { dispatchAction } from '@/utils/actionDispatcher';

const ComponentRenderer = ({ componentConfig, index, pageContext, itemContext = {} }) => {
  console.log('componentconfig', componentConfig);
  const ResolvedComponent = componentMap[componentConfig.type];

  if (componentConfig.type === 'Fragment') {
    return componentConfig.children.map((child, childIndex) => (
      <ComponentRenderer
        key={`${index}-${childIndex}`}
        componentConfig={child}
        index={`${index}-${childIndex}`}
        pageContext={pageContext}
        itemContext={itemContext}
      />
    ));
  }

  if (!ResolvedComponent) {
    console.warn(`Component type '${componentConfig.type}' not found in componentMap.`);
    return (
      <div key={index} className="text-red-500">
        Unknown component type: {componentConfig.type}
      </div>
    );
  }

  const propsToPass = {
    ...resolveDynamicData(componentConfig.props, pageContext),
    key: index,
    dispatchAction,
    itemContext,
  };

  console.log('children=====>',componentConfig.children)
  componentConfig?.children?.map((child, childIndex) => (console.log('child',child)));
  if (componentConfig.children && componentConfig.children.length > 0) {
    return React.createElement(
      ResolvedComponent,
      propsToPass,
      componentConfig.children.map((child, childIndex) => (
        <ComponentRenderer
          key={`${index}-${childIndex}`}
          componentConfig={child}
          index={`${index}-${childIndex}`}
          pageContext={pageContext}
          itemContext={itemContext}
        />
      ))
    );
  }

  return React.createElement(ResolvedComponent, propsToPass);
};

export default ComponentRenderer;