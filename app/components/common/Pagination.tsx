// import Link from "next/link";

// export default function Pagination({
//   current,
//   total,
// }: {
//   current: number;
//   total: number;
// }) {
//   const pages = Array.from({ length: total }, (_, i) => i + 1);

//   return (
//     <div className="my-3 flex gap-2 items-center justify-center">
//       {pages.map((page) => (
//         <Link
//           key={page}
//           href={`?page=${page}`}
//           className={`px-3 py-1 rounded border ${
//             page === current ? "bg-[#2cbc6350] text-white" : "bg-white"
//           }`}
//         >
//           {page}
//         </Link>
//       ))}
//     </div>
//   );
// }

import Link from "next/link";

export default function Pagination({
  current,
  total,
  maxVisible = 3,
}: {
  current: number;
  total: number;
  maxVisible?: number;
}) {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(current - half, 1);
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="my-3 flex gap-2 items-center justify-center">
      {/* Left arrow */}
      {current > 1 && (
        <Link
          href={`?page=${current - 1}`}
          className="px-3 py-1 rounded border bg-white"
        >
          ←
        </Link>
      )}

      {/* Page buttons */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-3 py-1 rounded border ${
            page === current ? "bg-[#2cbc6350] text-white" : "bg-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Right arrow */}
      {current < total && (
        <Link
          href={`?page=${current + 1}`}
          className="px-3 py-1 rounded border bg-white"
        >
          →
        </Link>
      )}
    </div>
  );
}

