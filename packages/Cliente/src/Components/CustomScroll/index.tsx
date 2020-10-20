import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import styled from 'styled-components';

const SCROLL_BOX_MIN_HEIGHT = 20;

const cleanupFunc: () => void = () => null;

const CustomScrollWrapper = styled.div`
  .scrollhost::-webkit-scrollbar {
    display: none;
  }

  .scrollhost-container {
    position: relative;
    height: 100%;
  }
  .scrollhost {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
  }

  .scroll-bar {
    width: 10px;
    height: 100%;
    right: 0;
    top: 0px;
    position: absolute;
    border-radius: 7px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.35);
  }

  .scroll-thumb {
    width: 8px;
    height: 20px;
    margin-left: 1px;
    position: absolute;
    border-radius: 7px;
    opacity: 1;
    top: 0;
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

interface ICustomScroll {
  children?: React.ReactNode;
  className?: string;
}

const CustomScroll: React.FC<ICustomScroll> = React.memo(
  ({
    children,
    className,
    ...restProps
  }: ICustomScroll) => {
    const [hovering, setHovering] = useState(false);
    const [scrollBoxHeight, setScrollBoxHeight] = useState(
      SCROLL_BOX_MIN_HEIGHT,
    );
    const [scrollBoxTop, setScrollBoxTop] = useState(0);
    const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
    const [isDragging, setDragging] = useState(false);
    const scrollHostRef = useRef<HTMLDivElement>(null);

    const handleMouseOver = useCallback(() => {
      if (!hovering) {
        setHovering(true);
      }
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
      if (hovering) {
        setHovering(false);
      }
    }, [hovering]);

    const handleDocumentMouseUp = useCallback(
      (e) => {
        if (isDragging) {
          e.preventDefault();
          setDragging(false);
        }
      },
      [isDragging],
    );

    const handleDocumentMouseMove = useCallback(
      (e) => {
        if (isDragging && scrollHostRef.current) {
          e.preventDefault();
          e.stopPropagation();
          const scrollHostElement = scrollHostRef.current;
          const { scrollHeight, offsetHeight } = scrollHostElement;

          const deltaY = e.clientY - lastScrollThumbPosition;
          const percentage = deltaY * (scrollHeight / offsetHeight);

          setScrollThumbPosition(e.clientY);
          setScrollBoxTop(
            Math.min(
              Math.max(0, scrollBoxTop + deltaY),
              offsetHeight - scrollBoxHeight,
            ),
          );
          scrollHostElement.scrollTop = Math.min(
            scrollHostElement.scrollTop + percentage,
            scrollHeight - offsetHeight,
          );
        }
      },
      [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop],
    );

    const handleScrollThumbMouseDown = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollThumbPosition(e.clientY);
      setDragging(true);
    }, []);

    const handleScroll = useCallback(() => {
      if (!scrollHostRef) {
        return;
      }

      if (scrollHostRef.current) {
        const scrollHostElement = scrollHostRef.current;
        const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

        let newTop = (scrollTop / scrollHeight) * offsetHeight;
        newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
        setScrollBoxTop(newTop);
      }
    }, [scrollBoxHeight]);

    useEffect(() => {
      if (scrollHostRef.current) {
        const scrollHostElement = scrollHostRef.current;
        const { clientHeight, scrollHeight } = scrollHostElement;
        const scrollThumbPercentage = clientHeight / scrollHeight;
        const scrollThumbHeight = Math.max(
          scrollThumbPercentage * clientHeight,
          SCROLL_BOX_MIN_HEIGHT,
        );
        setScrollBoxHeight(scrollThumbHeight);
        scrollHostElement.addEventListener('scroll', handleScroll, true);
        return function cleanup() {
          scrollHostElement.removeEventListener('scroll', handleScroll, true);
        };
      }

      return cleanupFunc;
    }, [handleScroll]);

    useEffect(() => {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleDocumentMouseUp);
      document.addEventListener('mouseleave', handleDocumentMouseUp);
      return function cleanup() {
        document.removeEventListener('mousemove', handleDocumentMouseMove);
        document.removeEventListener('mouseup', handleDocumentMouseUp);
        document.removeEventListener('mouseleave', handleDocumentMouseUp);
      };
    }, [handleDocumentMouseMove, handleDocumentMouseUp]);

    const scrollTrumbStyle = useMemo(
      () => ({ height: scrollBoxHeight, top: scrollBoxTop }),
      [scrollBoxHeight, scrollBoxTop],
    );

    const scrollBarStyle = useMemo(() => ({ opacity: hovering ? 1 : 0 }), [
      hovering,
    ]);

    return (
      <CustomScrollWrapper>
        <div
          className="scrollhost-container"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div
            ref={scrollHostRef}
            className={`scrollhost ${className}`}
            {...restProps}
          >
            {children}
          </div>
          <div className="scroll-bar" style={scrollBarStyle}>
            <div
              className="scroll-thumb"
              style={scrollTrumbStyle}
              onMouseDown={handleScrollThumbMouseDown}
            />
          </div>
        </div>
      </CustomScrollWrapper>
    );
  },
);

CustomScroll.defaultProps = {
  children: <div />,
  className: '',
};

export default CustomScroll;
