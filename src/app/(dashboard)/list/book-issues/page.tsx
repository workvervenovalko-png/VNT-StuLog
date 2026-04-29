import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { BookIssue, Book, Student, Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@/lib/auth-helpers";
import ReturnBookButton from "@/components/ReturnBookButton";

type BookIssueList = BookIssue & { book: Book; student: Student };

const BookIssueListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    {
      header: "Book Title",
      accessor: "book",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Issue Date",
      accessor: "issueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      accessor: "status",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" || role === "librarian"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: BookIssueList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-plPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.book.title}</td>
      <td>{item.student.name} {item.student.surname}</td>
      <td className="hidden md:table-cell">{item.issueDate.toLocaleDateString()}</td>
      <td className="hidden md:table-cell">{item.dueDate.toLocaleDateString()}</td>
      <td className="hidden lg:table-cell">
        <span className={`px-2 py-1 rounded-md text-white ${item.status === 'RETURNED' ? 'bg-green-500' : 'bg-blue-500'}`}>
            {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "librarian") && (
            <>
              {item.status === "ISSUED" && <ReturnBookButton id={item.id} />}
              <FormContainer table="bookIssue" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.BookIssueWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { book: { title: { contains: value } } },
              { student: { name: { contains: value } } },
              { student: { surname: { contains: value } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE-BASED FILTERING
  switch (role) {
    case "admin":
    case "librarian":
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = { parentId: currentUserId! };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.bookIssue.findMany({
      where: query,
      include: {
        book: true,
        student: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.bookIssue.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Book Issuance Log</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-plYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-plYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "librarian") && (
              <FormContainer table="bookIssue" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default BookIssueListPage;
