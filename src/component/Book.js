import { Button } from "react-bootstrap"
import { faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Book = ({
    buku,
    deleteButtonHandler,
    doneButtonHandler,
    notDoneButtonHandler,
}) => {
    return (
        <div className="book">
            <div className="book-detail">
                <h4>{buku.judul}</h4>
                <p>{buku.tahun}</p>
                <p>{buku.penulis}</p>
            </div>

            <div className="button-confirmation">
                {!buku.done && (
                    <Button
                        variant="success"
                        onClick={doneButtonHandler.bind(this, buku)}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                )}

                {buku.done && (
                    <Button
                        variant="primary"
                        onClick={notDoneButtonHandler.bind(this, buku)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                )}

                <Button
                    variant="warning"
                    onClick={deleteButtonHandler.bind(this, buku.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        </div>
    )
}

export default Book
