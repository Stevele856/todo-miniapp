import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

const TaskListsPagination = ({ page, totalPages, handleNext, handleBack, randomPageChanges }) => {
  
  const generatedPages = () => {
    const pages = []

    // Show all
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++){
        pages.push(i) // add pages nummber into an array
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (page >= totalPages - 1) { // page located after the last page
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else { // page located in the middle
        pages.push(1, '...', page, '...', totalPages )
      }
    }
    return pages
  }

  const pagesToShow = generatedPages()

  return (

    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Prev  */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handleBack}
              className={cn(
                'cursor-pointer',
                page === 1 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

          {pagesToShow.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (<PaginationEllipsis />) : 
                <PaginationLink
                  isActive={pageNumber === page}
                  onClick={() => {
                    if (pageNumber !== page) {
                      randomPageChanges(pageNumber) // Khi click vào số trang nếu khác trang hiện tại thì sẽ gọi hàm randomPageChange để đổi trang
                    }
                  }}
                  className='cursor-pointer'
                >
                  {pageNumber}
                </PaginationLink>
              }
            </PaginationItem>
          ))}
          
          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn(
                'cursor-pointer',
                page === totalPages && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TaskListsPagination