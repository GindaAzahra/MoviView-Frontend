
export default function MovieDetailSkeleton() {
    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--cine-bg-dark)' }}>
            <main className="flex-grow-1">
                <section className="position-relative w-100 overflow-hidden" style={{ height: '650px' }}>
                    <div className="position-absolute w-100 h-100 start-0 top-0 bg-dark"></div>
                    
                    <div className="container-xl position-relative h-100 pb-5 d-flex align-items-end">
                        <div className="d-flex flex-column flex-md-row gap-5 align-items-end w-100">
                            {/* Poster Skeleton */}
                            <div className="d-none d-md-block flex-shrink-0 skeleton rounded-3 overflow-hidden shadow-lg" style={{ width: '256px', aspectRatio: '2/3' }}></div>

                            {/* Details Skeleton */}
                            <div className="flex-grow-1 pb-3 w-100">
                                <div className="d-flex flex-column gap-2">
                                    <div className="skeleton mb-2" style={{ height: '70px', width: '60%', borderRadius: '8px' }}></div>

                                    <div className="d-flex align-items-center gap-3">
                                        <div className="skeleton" style={{ height: '20px', width: '50px', borderRadius: '4px' }}></div>
                                        <div className="skeleton" style={{ height: '20px', width: '150px', borderRadius: '4px' }}></div>
                                        <div className="skeleton" style={{ height: '20px', width: '80px', borderRadius: '4px' }}></div>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 mt-3">
                                        <div className="skeleton" style={{ height: '40px', width: '100px', borderRadius: '4px' }}></div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="skeleton mb-2" style={{ height: '16px', width: '100%', borderRadius: '4px' }}></div>
                                        <div className="skeleton mb-2" style={{ height: '16px', width: '95%', borderRadius: '4px' }}></div>
                                        <div className="skeleton mb-2" style={{ height: '16px', width: '90%', borderRadius: '4px' }}></div>
                                        <div className="skeleton" style={{ height: '16px', width: '40%', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-xl py-5">
                    <div className="skeleton mb-4" style={{ height: '40px', width: '200px', borderRadius: '8px' }}></div>
                    <div className="row g-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="col-12">
                                <div className="skeleton" style={{ height: '150px', width: '100%', borderRadius: '12px' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
