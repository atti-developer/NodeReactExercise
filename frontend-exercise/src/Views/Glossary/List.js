import React, { useState, useEffect } from 'react';
import * as RB from 'react-bootstrap';
import { MdAddCircleOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiCommentEdit } from "react-icons/bi";

import PaginationComponent from "../../Components/Common/PaginationComponent";

import {
    GET_GLOSSORY_LIST,
    GET_GLOSSARY_DETAIL,
    DELETE_GLOSSARY
} from "../../Utils/api";

import Modal from "../../Components/Common/Modal";

import AddGlossary from "../../Components/Models/AddGlossary"
import EditGlossary from "../../Components/Models/EditGlossary"
const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    let [searchData, setSearchData] = useState("");
    const [TotalCount, setTotalCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [isSort, setSort] = useState("Asc");


    const [isOpen, setIsOpen] = useState(false);
    const [ModelMsg, setModelMsg] = useState("");

    const [CustomerListArray, setCustomerListArray] = useState([]);
    const [show_editCustomer, setEdit] = useState(false);
    const [userData, setUserData] = useState({});

    const [AddModal, setAddModal] = useState(false);

    const OpenCustomerModal = () => {
        setAddModal(true)
        // setModelMsg("Invalid file type, please choose xlsx or csv file")
        // modelSet();
    }



    const modelSet = async () => {
        setIsOpen(true);
    };

    const sortByAlphaTerm = () => {
        var newArr = CustomerListArray.sort(function (a, b) {
            var nameA = a.terms.toLowerCase(), nameB = b.terms.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
        setCustomerListArray([...newArr])
    }
    const sortByAlphaDef = () => {
        var newArr = CustomerListArray.sort(function (a, b) {
            var nameA = a.definitions.toLowerCase(), nameB = b.definitions.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
        setCustomerListArray([...newArr])
    }
    const editCustomerShow = async (id) => {
        const res = await GET_GLOSSARY_DETAIL(id);
        let { data } = res;
        console.log(data)
        setUserData(data)
        setEdit(true)
    };
    const deleteRecord = async (id) => {
        const res = await DELETE_GLOSSARY(id);
        let { msg } = res;
        apiCall()
        setModelMsg("RECORD DELETED SUCCESSFULLY..")
        modelSet();
    }

    const apiCall = async () => {
        setLoading(true);
        const res = await GET_GLOSSORY_LIST(currentPage, itemPerPage, searchData);
        console.log("COntroller data", res)

        let { docs, totalDocs } = res.data;
        console.log("COntroller", docs)
        setCustomerListArray(docs);
        setTotalCount(totalDocs);
        setLoading(false);
    }

    useEffect(() => {
        apiCall()
    }, [currentPage, itemPerPage]);

    return (

        <RB.Row className="rownew1">
            <RB.Col lg={12}>
                <nav class="navbar navbar-dark bg-dark">
                    <h1 id="head">  CRUD OPERATION USING REACT-JS, EXPRESS-JS & MONGODB</h1>
                </nav>
            </RB.Col>
            <RB.Col lg={12}>
                <div className="box_detail" style={{ borderRadius: "4px" }}>
                    <div className="page-header row">
                        <RB.Col md={12}>
                            <RB.Form className="manage_searchorder">
                                <RB.Row className="mg_row0">
                                    <RB.Col lg={12} md={12} className="customer_leftsrh">
                                        <RB.Row className="mg_row0">
                                            <RB.Col lg={6} md={3} className="customer_sdate">
                                                <h1>Glossary List</h1>
                                            </RB.Col>
                                            <RB.Col md={6} xs={12} className="table_span">
                                                <div className="float-right responsive_floatbtn">
                                                    <RB.Button size="sm" variant="primary" className="btn_svg"
                                                        onClick={OpenCustomerModal}
                                                    >
                                                        <MdAddCircleOutline style={{ marginRight: "3px" }} />
                                                        ADD NEW RECORD
                                                    </RB.Button>
                                                </div>
                                            </RB.Col>
                                        </RB.Row>
                                    </RB.Col>

                                </RB.Row>
                            </RB.Form>
                        </RB.Col>
                    </div>
                </div>
            </RB.Col>

            <RB.Col lg={12}>
                <RB.Row className="rownew1">
                    <div className="tableHeader tableHeader1 search_new">
                        <RB.Col lg={6} md={6} className="table_span">
                            <h3 className="page-title d-flex userv">
                                <span>List</span>
                            </h3>
                        </RB.Col>
                        <RB.Col lg={6} md={6} className="table_span total_recordt">
                            <span>Total Records: {TotalCount}</span>
                        </RB.Col>
                    </div>
                </RB.Row>
                <div
                    className="box_detail table_boxdtl manage_order">
                    <RB.Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr class="vtable text-center">
                                <th className="text-center" style={{ width: "10%" }}>S. No.</th>
                                <th style={{ cursor: "pointer", width: "20%" }} onClick={sortByAlphaTerm}>Terms</th>
                                <th style={{ cursor: "pointer", width: "60%" }} onClick={sortByAlphaDef}>Definitions</th>
                                <th className="action_align" style={{ width: "10%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Loading ? <tr><td className="no_records" colSpan="11">Loading...</td></tr> : CustomerListArray.length > 0 ? CustomerListArray.map((info, inx) => {
                                let { _id, terms, definitions } = info;
                                return (
                                    <tr key={`MASTERCITY_${inx}`} class="text-center">
                                        <td className="s_notm text-center">{inx + 1}</td>
                                        <td className="">{terms}</td>
                                        <td className="">{definitions}</td>
                                        <td className="td_comments text-center">
                                            <BiCommentEdit title="Edit City" onClick={() => editCustomerShow(_id)} />
                                            <RiDeleteBin6Line title="Delete City" className="text-danger1" onClick={() => deleteRecord(_id)} />
                                        </td>
                                    </tr>
                                )
                            }) : <tr><td className="no_records" colSpan="11">No Records Found</td></tr>}
                        </tbody>
                    </RB.Table>
                </div>
            </RB.Col>

            <PaginationComponent
                MOCK_DATA={TotalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
            />

            <AddGlossary
                AddModal={AddModal}
                setAddModal={setAddModal}
                apiCall={apiCall}
            />
            <EditGlossary
                show_editCustomer={show_editCustomer}
                setEdit={setEdit}
                userData={userData}
                apiCall={apiCall}
            />


            <Modal text={ModelMsg} open={isOpen} onClose={() => setIsOpen(false)} />


        </RB.Row>
    )
}

export default List;
