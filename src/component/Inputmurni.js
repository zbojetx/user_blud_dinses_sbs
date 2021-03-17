import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker, InputNumber } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined,
    UserAddOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { ComponentToPrint } from './print/PrintRBA'
import { App } from './print/GetRincian'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import NumberFormat from 'react-number-format'
import moment from 'moment';
moment.locale('id')


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
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
    font-size: 14px;
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



function Sppd() {
    moment.locale('id')
    const [form] = Form.useForm();
    const [modal, setModal] = useState(false)
    const [modalAnggaran, setModalAnggaran] = useState(false)
    const [modalPrintRBA, setModalPrintRBA] = useState(false)

    const [item_1, setItem1] = useState('')
    const [item_2, setItem2] = useState('')
    const [item_3, setItem3] = useState('')
    const [item_4, setItem4] = useState('')
    const [item_5, setItem5] = useState('')
    const [judul, setJudul] = useState('')

    const [kode_rekening, setKodeRekening] = useState('')
    const [kode_blud, setKodeBlud] = useState('')
    const [id_kode_rekening, setIdKodeRekening] = useState('')
    const [tahun_anggaran, setTahunAnggaran] = useState('')
    const [total, setTotal] = useState(0)
    const [isTutup, setIsTutup] = useState('')

    const [kode_program, setProgram] = useState('')
    const [kode_kegiatan, setKegiatan] = useState('')
    const [sumber_dana, setSumberDana] = useState('')
    const [tanggaldikeluarkan, setTanggalDikeluarkan] = useState(moment().format("YYYY-MM-DD"))

    const [pagu, setPagu] = useState('')
    const [realisasi, setRealisasi] = useState('')
    const [realisasipersen, setRealisasiPersen] = useState('')

    const [listKodeRekening, setListKodeRekening] = useState([])
    const [listKelompok, setListKelompok] = useState([])
    const [listjenis, setListJenis] = useState([])
    const [listObjek, setListObjek] = useState([])
    const [listRincianObjek, setRincianListObjek] = useState([])
    const [liastAnggaran, setListAnggaran] = useState([])
    const [listProgramAnggaran, setListProgramAnggaran] = useState([])

    const [listProgram, setLisProgram] = useState([])
    const [listKegiatan, setListKegiatan] = useState([])
    const [listSumberDana, setListSumberDana] = useState([])

    const componentRef = useRef();

    const paramtoprint = {
        kode_blud,
        kode_program,
        kode_kegiatan,
        tahun_anggaran: localStorage.getItem('tahun')
    }

    useEffect(() => {
        getkoderekening()
        isLoginFunc()
        attr()
        getprogram()
    }, []);

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        const year = await localStorage.getItem('tahun')
        if (loginDatas !== null) {
            setKodeBlud(loginDatas.data[0].kode_blud)
            setTahunAnggaran(year)
            setIsTutup(loginDatas.data[0].status_input)
            getProgramAnggaranbyBlud(loginDatas.data[0].kode_blud, year)
        }
    }


    const attr = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Sumber'
        let attrformat = await getbyid(jenis, url)
        setListSumberDana(attrformat)
    }


    const modalTrigger = () => {
        setModal(!modal)
    }

    const modalAnggaranTrigger = () => {
        setModalAnggaran(!modalAnggaran)
    }

    const modalTriggerPrintRBA = () => {
        setModalPrintRBA(!modalPrintRBA)
    }

    const anggaranByProgram = async (blud, kodeprog, kodekeg) => {
        console.log(blud)
        console.log(kodeprog)
        console.log(kodekeg)
        setProgram(kodeprog)
        setKegiatan(kodekeg)
        await getAnggaranbyBlud(blud, localStorage.getItem('tahun'), kodeprog, kodekeg)
        setModalAnggaran(!modalAnggaran)
    }

    const paramforptint = async (blud, kodeprog, kodekeg) => {
        setKodeBlud(blud)
        setProgram(kodeprog)
        setKegiatan(kodekeg)
        modalTriggerPrintRBA()
    }

    const getAnggaranbyBlud = async (kode, tahun, kdprog, kdkeg) => {
        console.log(kode)
        console.log("ANGGARAN BLUD")
        let data = []
        const datas = {
            kode_blud: kode,
            tahun_anggaran: tahun,
            kode_program: kdprog,
            kode_kegiatan: kdkeg,
        }
        const url = 'getanggaranbyblud'
        let anggaran = await getallpost(datas, url)

        console.log(anggaran)
        let data_length = anggaran.anggaran.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                kode_rekening: anggaran.anggaran[i].kode_rekening,
                kode_blud: anggaran.anggaran[i].kode_blud,
                id_kode_rekening: anggaran.anggaran[i].id_kode_rekening,
                tahun_anggaran: anggaran.anggaran[i].tahun_anggaran,
                deskripsi: anggaran.anggaran[i].deskripsi_final,
                total: anggaran.anggaran[i].total,
                kode_akun: anggaran.anggaran[i].kode_akun,
                kode_kelompok: anggaran.anggaran[i].kode_kelompok,
                kode_jenis: anggaran.anggaran[i].kode_jenis,
                kode_objek: anggaran.anggaran[i].kode_objek,
                kode_rincian_objek: anggaran.anggaran[i].kode_rincian_objek,
            })
        }
        setListAnggaran(data)
        //modalTriggerPelaksana()
    }

    const getProgramAnggaranbyBlud = async (kode, tahun) => {
        let data = []
        const datas = {
            kode_blud: kode,
            tahun_anggaran: tahun
        }
        const url = 'getprogramanggaranbyblud'
        let anggaran = await getallpost(datas, url)
        console.log("BLUD ANGGARAN")
        console.log(anggaran)
        let data_length = anggaran.anggaran.length

        if (anggaran.pagu.length === 0) {
            setPagu("Admin belum menginput pagu")
        } else {
            setPagu(anggaran.pagu[0].pagu)
            setRealisasi(anggaran.realisasi[0].total)
            setRealisasiPersen((parseInt(anggaran.realisasi[0].total) / parseInt(anggaran.pagu[0].pagu)) * 100)
        }
        // if(anggaran.pagu[0].length !== 0 ){
        //     setPagu(anggaran.pagu[0].pagu)
        // }else{
        //     setPagu("Admin belum menginput pagu")
        // }
        
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                kode_program: anggaran.anggaran[i].kode_program,
                kode_kegiatan: anggaran.anggaran[i].kode_kegiatan,
                nama_program: anggaran.anggaran[i].nama_program,
                nama_kegiatan: anggaran.anggaran[i].nama_kegiatan,
                kode_blud: anggaran.anggaran[i].kode_blud,
                total: anggaran.anggaran[i].total,
            })
        }
        setListProgramAnggaran(data)
    }

    const getprogram = async () => {
        const url = 'getprogram'
        const programlist = await getall(url)
        setLisProgram(programlist)
    }

    const getkegiatanbyprogram = async (kode) => {
        const url = 'kegiatanbyprogram'
        let datax = await getbyid(kode, url)
        setListKegiatan(datax)
    }

    const getkoderekening = async () => {
        const url = 'getkoderekening'
        let kd = await getall(url)
        setListKodeRekening(kd)
    }


    const createAnggaran = async (id) => {
        //const total = 0
        let datas = {
            kode_blud,
            id_kode_rekening,
            kode_program,
            kode_kegiatan,
            sumber_dana,
            kode_rekening,
            tahun_anggaran,
            total
        }
        const apiurl = 'createanggaran'
        console.log(apiurl)
        let createanggaran = await createupdate(datas, apiurl)
        if (createanggaran === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getAnggaranbyBlud(kode_blud, localStorage.getItem('tahun'), kode_program, kode_kegiatan)
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

    const createProgramKegiatanForAnggaran = async () => {
        const total = 0
        let datas = {
            kode_blud,
            kode_program,
            kode_kegiatan,
            tahun_anggaran,
            sumber_dana,
            tanggaldikeluarkan,
            total
        }
        const apiurl = 'createprogramanggaran'
        console.log(apiurl)
        let createprogramanggaran = await createupdate(datas, apiurl)
        if (createprogramanggaran === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getProgramAnggaranbyBlud(kode_blud, localStorage.getItem('tahun'))
            resetForm()
            modalTrigger()
            //setPelaksana('')
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }

    }

    const removeAnggaran = async (kd) => {
        const url = 'deleteanggaran2'
        let datas = {
            kode_blud,
            kode_rekening: kd,
            tahun_anggaran,
        }
        const hapus = await getallpost(datas, url)
        getAnggaranbyBlud(kode_blud, localStorage.getItem('tahun'), kode_program, kode_kegiatan)
        notification.open({
            message: 'Data Berhasil dihapus',
            description:
                '',
            icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
        });

    }

    const removeProgram = async (kdblud, kdprog, kdkeg, th) => {
        const url = 'deleteanggaranbyprogram'
        let datas = {
            kode_blud: kdblud,
            kode_program: kdprog,
            kode_kegiatan: kdkeg,
            tahun_anggaran: th
        }
        const hapus = await getallpost(datas, url)
        getProgramAnggaranbyBlud(kdblud, th)
        notification.open({
            message: 'Data Berhasil dihapus',
            description:
                '',
            icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
        });

    }

    const resetForm = async () => {


    }


    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Kode Rekening',
            key: 'kode_rekening',
            render: (text, record) => (
                <span>
                    <b>{record.kode_akun}{record.kode_kelompok}{record.kode_jenis}{record.kode_objek}{record.kode_rincian_objek}</b>
                </span>
            ),
        },
        {
            title: 'Deskripsi',
            key: 'action',
            render: (text, record) => (
                <span>
                    <b>{record.deskripsi}</b>
                </span>
            ),
        },
        {
            title: 'Total',
            key: 'action',
            editable: true,
            render: (text, record) => (
                <span>
                    <NumberFormat thousandSeparator={true} displayType={'text'} style={{ fontWeight: 'bold' }} value={record.total} />
                </span>
            ),
        },
        {
            title: 'Rincian',
            key: 'action',
            render: (text, record) => (
                <span>
                    {(() => {
                        if (isTutup === '0') {
                            return (<Button type="danger" disabled> Penginputan nggaran ditutup </Button>)
                        } else {
                            if (record.kode_akun === '' || record.kode_kelompok === '' || record.kode_jenis === '' || record.kode_objek === '' || record.kode_rincian_objek === '') {
                                return (<></>)
                            } else {
                                return (<Button key="add_rincian" type="primary" onClick={() => browserHistory.push({ pathname: '/rincian', state: { kode_blud: text.kode_blud, kode_rekening: text.kode_rekening, tahun_anggaran: text.tahun_anggaran, id_kode_rekening: text.id_kode_rekening } })} icon={<ShoppingCartOutlined />} >Input / Edit Rincian</Button>)
                            }
                        }
                    }
                    )()}
                </span>
            ),
        },
        {
            title: '#',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removeAnggaran(record.kode_rekening)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus Rekening</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const columns2 = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Program',
            key: 'nama_program',
            render: (text, record) => (
                <span>
                    <b>{record.nama_program}</b>
                </span>
            ),
        },
        {
            title: 'Kegiatan',
            key: 'nama_kegiatan',
            render: (text, record) => (
                <span>
                    <b>{record.nama_kegiatan}</b>
                </span>
            ),
        },
        {
            title: 'Total',
            key: 'action',
            render: (text, record) => (
                <span>
                    <NumberFormat thousandSeparator={true} displayType={'text'} style={{ fontWeight: 'bold' }} value={record.total} />
                </span>
            ),
        },
        {
            title: '#',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="inputkoderekening" onClick={() => anggaranByProgram(record.kode_blud, record.kode_program, record.kode_kegiatan)} type="primary" style={{ marginRight: 10 }} icon={<DollarCircleOutlined />} >Input Kode Rekening</Button>
                    <Button key="printrba" onClick={() => paramforptint(record.kode_blud, record.kode_program, record.kode_kegiatan)} style={{ marginRight: 10, backgroundColor: '#2ecc71', color: 'white' }} icon={<PrinterOutlined />} >Print RBA</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removeProgram(record.kode_blud, record.kode_program, record.kode_kegiatan, localStorage.getItem('tahun'))}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus Rekening</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    const onChangeKodeRekening = async (value) => {
        setKodeRekening(value)
        setIdKodeRekening(value)
    }


    const onChangeProgram = async (value) => {
        setProgram(value)
        getkegiatanbyprogram(value)
    }

    const onChangeKegiatan = async (value) => {
        setKegiatan(value)
    }

    const onChangeSumberDana = async (value) => {
        setSumberDana(value)
    }

    const onChangeTanggalDikeluarkan = (value, string) => {
        console.log(string)
        setTanggalDikeluarkan(string)
    }


    const dateFormat = 'YYYY-MM-DD';
    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',
            }}
        >

            <Card
                title="Input Angggran Murni"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={
                    <span>
                        {(() => {
                            if (isTutup === '0') {
                                return (<Button type="danger" disabled> Penginputan nggaran ditutup </Button>)
                            } else {
                                return (<Button type="dashed" onClick={modalTrigger}>Input Anggaran </Button>)
                            }
                        }
                        )()}
                    </span>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
                <Row style={{ width: '100%' }}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ padding: 5 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5, textAlign: 'right' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} style={{ fontWeight: 'bold' }} value={pagu} /></span>
                            <Label>Total Pagu Tahun Anggaran {localStorage.getItem('tahun')}</Label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ padding: 5 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5, textAlign: 'right' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} style={{ fontWeight: 'bold' }} value={realisasi} /></span>
                            <Label>RBA Tahun Anggaran {localStorage.getItem('tahun')}</Label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ padding: 5 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5, textAlign: 'right' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>{Number.parseFloat(realisasipersen).toFixed(2)}  %</span>
                            <Label>RBA Tahun Anggaran {localStorage.getItem('tahun')} (%)</Label>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Table columns={columns2} dataSource={listProgramAnggaran} />

            <Modal
                title="Input Anggaran"
                centered
                visible={modal}
                onOk={createProgramKegiatanForAnggaran}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#3498db', color: 'white' }}>
                    <Label>Program dan Kegiatan</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Row style={{ width: "100%" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Label>Program</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Program"
                                optionFilterProp="children"
                                onChange={onChangeProgram}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih program</Option>
                                {listProgram.map((data, index) =>
                                    <Option value={data.kode_program}><b>{data.kode_program} - {data.nama_program}</b></Option>
                                )}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginTop: 10 }}>
                            <Label>Kegiatan</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kegiatan"
                                optionFilterProp="children"
                                onChange={onChangeKegiatan}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kegiatan</Option>
                                {listKegiatan.map((data, index) =>
                                    <Option value={data.kode_kegiatan}><b>{data.kode_kegiatan} - {data.nama_kegiatan}</b></Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#3498db', color: 'white' }}>
                    <Label>Sumber Dana</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Row style={{ width: "100%" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Label>Sumber dana</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Sumber Dana"
                                optionFilterProp="children"
                                onChange={onChangeSumberDana}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Sumber Dana</Option>
                                {listSumberDana.map((data, index) =>
                                    <Option value={data.nama_attr}><b>{data.nama_attr}</b></Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#3498db', color: 'white' }}>
                    <Label>Dikeluarkan pada tanggal</Label>
                </InputBoxCenter>
                <InputBoxBottom>
                    <DatePicker
                        //defaultValue={[moment(tanggaldikeluarkan, dateFormat)]}
                        onChange={onChangeTanggalDikeluarkan}
                        style={{ width: '100%', borderWidth: 0 }}
                    />
                </InputBoxBottom>
            </Modal>

            {/* Modal Print SPPD */}
            <Modal
                title="Kode Rekening per Kegiatan"
                centered
                visible={modalAnggaran}
                //onOk={createkegiatan}
                onCancel={modalAnggaranTrigger}
                width={1000}
                footer={null}
            >

                <Row style={{ width: '100%', marginBottom: 20, backgroundColor: '#0984e3' }} >
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Kode Rekening</Label>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Pilih Kode Akun"
                            optionFilterProp="children"
                            onChange={onChangeKodeRekening}
                        //value={format_nomor}
                        >
                            <Option value="">Pilih Kode Rekening</Option>
                            {listKodeRekening.map((data, index) =>
                                <Option value={data.id_kode_rekening}><b>{data.kode_akun}{data.kode_kelompok}{data.kode_jenis}{data.kode_objek}{data.kode_rincian_objek} - {data.deskripsi_final} </b> </Option>
                            )}
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Anggaran</Label>
                        <InputNumber
                            defaultValue={100000}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                            value={total}
                            onChange={value => setTotal(value)}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 10 }}>
                        <Button block type="primary" onClick={createAnggaran}> Simpan</Button>
                    </Col>
                </Row>


                <Table columns={columns} dataSource={liastAnggaran} />
            </Modal>


            <Modal
                title="Print Rencana Bisnis Anggaran (RBA)"
                centered
                visible={modalPrintRBA}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintRBA}
                footer={null}
                width={1000}
            >
                <ComponentToPrint
                    key={paramtoprint.kode_kegiatan}
                    ref={componentRef}
                    dataToPrint={paramtoprint}
                    style={{ marginBottom: 20 }}
                />
                {/* <App 
                     key={kode_rekening}
                     ref={componentRef}
                     dataToPrint={paramtoprint}
                /> */}
                <ReactToPrint
                    trigger={() => <Button block type="primary" icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}

                />

            </Modal>


        </Content>
    )
}


export default Sppd;



