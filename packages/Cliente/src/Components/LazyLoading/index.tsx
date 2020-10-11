import React, {
  Suspense,
} from 'react';
import LoadingComponent from '../Loading';

function LazyLoading(
  Component: React.ElementType,
  extras: JSX.ElementAttributesProperty,
) {
  return (
    props: JSX.ElementAttributesProperty,
  ): JSX.Element => (
    <Suspense
      fallback={
        <LoadingComponent />
      }
    >
      <Component
        {...props}
        {...extras}
      />
    </Suspense>
  );
}

export default LazyLoading;
