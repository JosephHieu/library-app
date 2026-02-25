class BookCopyModel {
  id: number;
  bookId: number;
  status: string;
  shelfLocation: string;

  constructor(
    id: number,
    bookId: number,
    status: string,
    shelfLocation: string
  ) {
    this.id = id;
    this.bookId = bookId;
    this.status = status;
    this.shelfLocation = shelfLocation;
  }
}

export default BookCopyModel;
