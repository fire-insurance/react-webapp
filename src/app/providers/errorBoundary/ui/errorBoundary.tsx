import { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError (_error: Error) {
        return { hasError: true };
    }

    componentDidCatch (error: Error, info: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.log(error, info);
    }

    render () {
        const { hasError } = this.state;
        const { children, fallback } = this.props;

        return hasError
            ? (
                <Suspense fallback={null}>
                    {fallback}
                </Suspense>
            )
            : children;
    }
}
