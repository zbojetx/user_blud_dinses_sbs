import React, { useEffect, useState } from 'react';
import { Layout, Select, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Form, Radio } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge'
import styled from 'styled-components';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;

const InputBox = styled.input`
    border: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
`;

const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Judul = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
    &:focus{
        outline: none;
    }
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
`;

const Buttonx = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;

const Inputx = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;

function Pelayanan() {

    const [modal, setModal] = useState(false)
    const [id, setId] = useState('')

    const [item_1, setItem1] = useState('')
    const [item_2, setItem2] = useState('')
    const [item_3, setItem3] = useState('')
    const [item_4, setItem4] = useState('')
    const [item_5, setItem5] = useState('')
    const [judul, setJudul] = useState('')
    const [id_kode_rekening, setIdKodeRekening] = useState('')
    const [listKodeRekening, setListKodeRekening] = useState([])


    useEffect(() => {
        getkoderekening()
        // attrBank()
        // attrEselon()
        // attrJabatan()
        // attrPangkat()
    }, []);



    const modelTrigger = () => {
        setModal(!modal)
    }

    const getkoderekeningbyid= async (id) => {
        const url = 'getkoderekeningbyid'
        let pegawaibyid = await getbyid(id, url)
        console.log(pegawaibyid)
        setId(id)
        setItem1(pegawaibyid[0].item_1)
        setItem2(pegawaibyid[0].item_2)
        setItem3(pegawaibyid[0].item_3)
        setItem4(pegawaibyid[0].item_4)
        setItem5(pegawaibyid[0].item_5)
        setJudul(pegawaibyid[0].judul)
        modelTrigger()
    }


    const getkoderekening = async () => {
        const data = []
        const url = 'getkoderekening'
        let kd = await getall(url)
        console.log(kd)
        let data_length = kd.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: kd[i].id,
                akun: kd[i].item_1,
                kelompok: kd[i].item_2,
                jenis: kd[i].item_3,
                objek: kd[i].item_4,
                rincian_objek: kd[i].item_5,
                judul: kd[i].judul
            })
        }
        setListKodeRekening(data)

    }

    const removekoderekening = async (idx) => {
        const url = 'deletekoderekening'
        console.log(idx)
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getkoderekening()
        }
    }

    const create = async () => {
        let idkoderek = `${item_1}${item_2}${item_3}${item_4}${item_5}`
        let datas = {
            id_kode_rekening : idkoderek,
            item_1,
            item_2,
            item_3,
            item_4,
            item_5,
            judul
        }
        const apiurl = 'createkoderekening';
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getkoderekening()
            // getpegawai()
            // modelTrigger()
            // resetForm()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const update = async () => {
            let datas = {
                id,
                item_1,
                item_2,
                item_3,
                item_4,
                item_5,
                judul
            }
            const apiurl = 'updatekoderekening';
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                //getpegawai()
                getkoderekening()
                modelTrigger()
                resetForm()
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
    }





    const resetForm = () => {
        setItem1('')
        setItem2('')
        setItem3('')
        setItem4('')
        setItem5('')
        setJudul('')
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Kode Rekening',
            key: 'action',
            render: (text, record) => {
                if (record.kelompok === '' && record.jenis === '' && record.objek === '' && record.rincian_objek === '') {
                    return (<span style={{ fontWeight: 'bold' }}> {record.akun} </span>)
                } else if (record.jenis === '' && record.objek === '' && record.rincian_objek === '') {
                    return (<span style={{ fontWeight: 'bold' }}> {record.akun}.{record.kelompok} </span>)
                }
                else if (record.objek === '' && record.rincian_objek === '') {
                    return (<span style={{ fontWeight: 'bold' }}> {record.akun}.{record.kelompok}.{record.jenis} </span>)
                } else if (record.rincian_objek === '') {
                    return (<span style={{ fontWeight: 'bold' }}> {record.akun}.{record.kelompok}.{record.jenis}.{record.objek} </span>)
                } else {
                    return (<span style={{ fontWeight: 'bold' }}> {record.akun}.{record.kelompok}.{record.jenis}.{record.objek}.{record.rincian_objek} </span>)
                }
            }
        },
        {
            title: 'Judul / Deskripsi',
            key: 'judul',
            dataIndex: 'judul'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getkoderekeningbyid(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removekoderekening(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >

            <Card
                title="Kode Rekening"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
                <Row style={{ width: '100%' }}>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Akun</Label>
                        <InputBox value={item_1} onChange={e => setItem1(e.target.value)} />
                    </Col >
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Kelompok</Label>
                        <InputBox value={item_2} onChange={e => setItem2(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Jenis</Label>
                        <InputBox value={item_3} onChange={e => setItem3(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Objek</Label>
                        <InputBox value={item_4} onChange={e => setItem4(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Rincian Objek</Label>
                        <InputBox value={item_5} onChange={e => setItem5(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={9} xl={12} style={{ padding: 5 }}>
                        <Label>Judul</Label>
                        <InputBox value={judul} onChange={e => setJudul(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={3} xl={2} style={{ padding: 5 }}>
                        <Buttonx onClick={create}>Simpan</Buttonx>
                    </Col>
                </Row>
            </Card>
            <Table columns={columns} dataSource={listKodeRekening} />

            <Modal
                title="Edit Kode Rekening"
                centered
                visible={modal}
                onOk={update}
                onCancel={modelTrigger}
                width={1000}
            >
                <Row style={{ width: '100%' }}>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Akun</Label>
                        <InputBox value={item_1} onChange={e => setItem1(e.target.value)} />
                    </Col >
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Kelompok</Label>
                        <InputBox value={item_2} onChange={e => setItem2(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Jenis</Label>
                        <InputBox value={item_3} onChange={e => setItem3(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Objek</Label>
                        <InputBox value={item_4} onChange={e => setItem4(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={2} xl={2} style={{ padding: 5 }}>
                        <Label>Rincian Objek</Label>
                        <InputBox value={item_5} onChange={e => setItem5(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={9} xl={12} style={{ padding: 5 }}>
                        <Label>Judul</Label>
                        <InputBox value={judul} onChange={e => setJudul(e.target.value)} />
                    </Col>
                </Row>
            </Modal>

        </Content>
    )
}

export default Pelayanan;



