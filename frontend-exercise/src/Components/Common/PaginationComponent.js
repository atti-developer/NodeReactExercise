import React, { useState } from 'react';
import "./style.css";
import * as RB from "react-bootstrap";
import { Form, Pagination } from "react-bootstrap";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const PaginationComponent = ({ MOCK_DATA, currentPage, setCurrentPage, itemPerPage, setItemPerPage }) => {

    const [pageNumberLimit, setNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [GOTO, setGOTO] = useState(0);

    const gotopage = (e) => {
        setGOTO(Number(e.target.value));
    }

    const clickGO = () => {
        setCurrentPage(Number(GOTO))
    }

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const handleChange = (e) => {
        setCurrentPage(1);
        setItemPerPage(e.target.value)
    }

    const page = [];
    for (let i = 1; i <= Math.ceil(MOCK_DATA / itemPerPage); i++) {
        page.push(i)
    }

    const renderPageNumbers = page.map((num, inx) => {
        if (num <= maxPageNumberLimit && num > minPageNumberLimit) {
            return (
                <Pagination.Item key={inx} id={num} onClick={handleClick} className={currentPage === num ? "active" : null} >{num}</Pagination.Item>
            )
        } else {
            return null
        }
    });

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    return (
        <>
            {
                MOCK_DATA === 0 ? null :
                    <RB.Col lg={12}>
                        <RB.Row className="paginate_top">
                            <RB.Col xl={3} lg={6} md={6}>
                                {/* <RB.Row>
                                    <RB.Col lg={2} xs={2} className="pdr_0show">
                                        <span className="labelt">Show</span>
                                    </RB.Col>
                                    <RB.Col lg={3} xs={4}>
                                        <span>
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlSelect1" className="show_peritemp" style={{ marginBottom: "0px" }}>
                                                    <Form.Control as="select" className="select_page" onChange={handleChange}>
                                                        <option value={20}>20</option>
                                                        <option value={50}>50</option>
                                                        <option value={100}>100</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </span>
                                    </RB.Col>
                                    <RB.Col lg={5} xs={6} className="pdl_0show">
                                        <span className="labelt">Item per page</span>
                                    </RB.Col>
                                </RB.Row> */}
                            </RB.Col>
                            <RB.Col xl={2} lg={6} md={6} className="go_pages">
                                {/* <span className="labelt">Go To Page :</span>    <input type="number" className="form-control go-page" onChange={gotopage} />
                                <RB.Button type="submit" size="sm" variant="primary" className="go_btnpage" onClick={clickGO}>Go</RB.Button> */}

                            </RB.Col>

                            <RB.Col xl={3} lg={6} md={6} className="showing_page">
                                <RB.Col lg={12} className="text-right showing_mobile">
                                    <span className="labelt">showing {currentPage} - {MOCK_DATA.length === 0 ? "0" : currentPage * itemPerPage} of {MOCK_DATA} items </span>
                                </RB.Col>
                            </RB.Col>


                            <RB.Col xl={4} lg={6}>
                                <Pagination className="float-right pagination_deskpage">

                                    <Pagination.Prev className="page_prev" onClick={handlePrevBtn} disabled={currentPage === page[0] ? true : false}>
                                        < GrFormPreviousLink className="prev_btn" />Prev
                                    </Pagination.Prev>

                                    {renderPageNumbers}

                                    <Pagination.Next className="page_next" onClick={handleNextBtn} disabled={currentPage === page[page.length - 1] ? true : false}>
                                        Next<GrFormNextLink className="next_btn" />
                                    </Pagination.Next>
                                </Pagination>
                            </RB.Col>
                        </RB.Row>
                    </RB.Col>
            }

        </>
    )
}

export default PaginationComponent
