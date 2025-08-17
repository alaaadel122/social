import React, { useState } from 'react'
import { getPosts } from '../Apis/posts/posts.api';
import { useQuery } from '@tanstack/react-query';

export default function Pagination({ noOfPage }) {
     const [page, setPage] = useState(1);

     const { data, isLoading, isError, error } = useQuery({
          queryKey: ["posts", page], // مهم عشان React Query يعرف يجيب صفحة مختلفة
          queryFn: () => getPosts({ limit: 10, page }),
          keepPreviousData: true, // يفضل البيانات القديمة لحد ما الجديدة توصل
     });
     console.log(data)
  const totalPages = (data?.paginationInfo?.numberOfPages)/40;

     if (isLoading) return <h2>Loading...</h2>;
     if (isError) return <h2>{error.message}</h2>;

     return (
          <>
               {/* Pagination */}
               <div className="flex justify-center items-center gap-2 mt-6">
                    {/* Prev */}
                    <button
                         disabled={page === 1}
                         onClick={() => setPage((prev) => prev - 1)}
                         className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                         Prev
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                         <button
                              key={i + 1}
                              onClick={() => setPage(i + 1)}
                              className={`px-3 py-1 rounded ${page === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                   }`}
                         >
                              {i + 1}
                         </button>
                    ))}

                    {/* Next */}
                    <button
                         disabled={page === totalPages}
                         onClick={() => setPage((prev) => prev + 1)}
                         className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                         Next
                    </button>
               </div>

          </>
     )
}
