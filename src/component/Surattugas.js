import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { ComponentToPrint } from './print/Printst'
import { ComponentToPrintKwitansi } from './print/Printkwintansi';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
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
    const [modalPrintSt, setModalPrintSt] = useState(false)
    const [modalPrintKwitansi, setModalPrintKwitansi] = useState(false)
    const [modalPelaksana, setModalPelaksana] = useState(false)
    const [listSuratTugas, setListSuratTugas] = useState([])
    const [listPegawai, setListPegawai] = useState([])
    const [id, setId] = useState('')
    const [isUpdate, setIsUpdate] = useState('')

    const [item_1, setItem1] = useState('')
    const [item_2, setItem2] = useState('')
    const [item_3, setItem3] = useState('')
    const [item_4, setItem4] = useState('')
    const [item_5, setItem5] = useState('')
    const [judul, setJudul] = useState('')

    const [listKodeRekening, setListKodeRekening] = useState([])
    const [listKelompok, setListKelompok] = useState([])
    const [listjenis, setListJenis] = useState([])
    const [listObjek, setListObjek] = useState([])
    const [listRincianObjek, setRincianListObjek] = useState([])

    const componentRef = useRef();


    useEffect(() => {
        getakun()
        // getsurattugas()
        // getprovinsi()
        // getpegawai()
        // attr()
    }, []);


    // const attr = async () => {
    //     const url = 'getattrbyjenis'
    //     const jenis = 'Format'
    //     let attrformat = await getbyid(jenis, url)
    //     setListFormatSurat(attrformat)
    // }


    const modalTrigger = () => {
        setModal(!modal)
    }

    // const modalTriggerPelaksana = (id) => {
    //     setId(id)
    //     getPelaksanaById(id)
    //     setModalPelaksana(!modalPelaksana)
    // }

    const getakun = async () => { //select item_1 where ({ item_2 ; '' , item_3 = '', item_4 = '', item_5 = ''})
        setItem2('')
        setItem3('')
        setItem4('')
        setItem5('')
        const url = 'getkoderekeningakun'
        let datas = {
            forselect: 'item_1',
            payload: {
                item_2,
                item_3,
                item_4,
                item_5
            }
        }
        let kd = await getallpost(datas, url)
        console.log(kd)
        setListKodeRekening(kd)
    }

    const getKelompok = async (value) => { //select item_2 where ({ item_1 ;  value , item_3 = '', item_4 = '', item_5 = ''})
        console.log(item_1)
        setItem1(value)
        setItem3('')
        setItem4('')
        setItem5('')
        const url = 'getkoderekeningakun'
        let datas = {
            forselect: 'item_2',
            payload: {
                item_1: value,
                item_3,
                item_4,
                item_5
            }
        }
        let kd = await getallpost(datas, url)
        setListKelompok(kd)
    }

    const getJenis = async (value) => { //select item_3 where ({ item_1 ;  value , item_2 = value, item_4 = '', item_5 = ''})
        console.log(item_1)
        setItem2(value)
        setItem3('')
        setItem4('')
        setItem5('')
        const url = 'getkoderekeningakun'
        let datas = {
            forselect: 'item_3',
            payload: {
                item_1,
                item_2: value,
                item_4,
                item_5
            }
        }
        let kd = await getallpost(datas, url)
        setListJenis(kd)
    }

    const getObjek = async (value) => { //select item_4 where ({ item_1 ;  value , item_2 = '', item_3 = value, item_5 = ''})

        console.log(item_1)
        setItem3(value)
        setItem4('')
        setItem5('')
        const url = 'getkoderekeningakun'
        let datas = {
            forselect: 'item_4',
            payload: {
                item_1,
                item_2,
                item_3: value,
                item_5
            }
        }
        let kd = await getallpost(datas, url)
        setListObjek(kd)

    }

    const getRincianObjek = async (value) => { //select item_5 where ({ item_1 ;  value , item_2 = '', item_3 = value, item_4 = value})
        console.log(item_1)
        setItem4(value)
        setItem5('')
        const url = 'getkoderekeningakun'
        let datas = {
            forselect: 'item_5',
            payload: {
                item_1,
                item_2,
                item_3,
                item_4: value
            }
        }
        
        let kd = await getallpost(datas, url)
        console.log(kd)
        setRincianListObjek(kd)
    }

    // const getSuratTugasById = async (id) => {
    //     const url = 'getsurattugasbyid'
    //     let surattugasbyid = await getbyid(id, url)

    //     setId(id)
    //     setNomorSurat(surattugasbyid[0].nomor_surat)
    //     setFormatNomor(surattugasbyid[0].format_nomor)
    //     setProvinsi(surattugasbyid[0].provinsi)
    //     setKabKota(surattugasbyid[0].kab_kota)
    //     setMaksud(surattugasbyid[0].maksud)
    //     setDasar(surattugasbyid[0].dasar)
    //     setMenimbang(surattugasbyid[0].waktu)
    //     setTempat(surattugasbyid[0].tempat)
    //     setPenandaTangan(surattugasbyid[0].penanda_tangan)
    //     setTanggalDikeluarkan(surattugasbyid[0].tanggaldikeluarkan)
    //     setTanggalBerangkat(surattugasbyid[0].tanggal_berangkat)
    //     setTanggalPulang(surattugasbyid[0].tanggal_pulang)
    //     setIsUpdate(true)
    //     modalTrigger()
    //     console.log(surattugasbyid)
    // }

    // const getPelaksanaById = async (id) => {
    //     let data = []
    //     const url = 'getpelaksanaid'
    //     let pelaksanabyid = await getbyid(id, url)
    //     let data_length = pelaksanabyid.length
    //     for (let i = 0; i < data_length; i++) {
    //         data.push({
    //             no: i + 1,
    //             id: pelaksanabyid[i].id,
    //             nama: pelaksanabyid[i].nama_pegawai,
    //         })
    //     }
    //     setListPelaksana(data)
    //     //modalTriggerPelaksana()
    // }

    // const modalTriggerPrintSt = async (id) => {
    //     await setId(id)
    //     setModalPrintSt(!modalPrintSt)
    // }

    // const getsurattugas = async () => {
    //     const data = []
    //     const url = 'getsurattugas'
    //     let surattugas = await getall(url)
    //     let data_length = surattugas.length

    //     console.log(surattugas)

    //     for (let i = 0; i < data_length; i++) {
    //         data.push({
    //             no: i + 1,
    //             id: surattugas[i].id,
    //             maksud: surattugas[i].maksud,
    //             format_nomor: surattugas[i].format_nomor,
    //             nomor_surat: surattugas[i].nomor_surat,
    //             tgl_berangkat: surattugas[i].tanggal_berangkat,
    //             tgl_pulang: surattugas[i].tanggal_pulang,
    //         })
    //     }
    //     setListSuratTugas(data)
    // }

    // const getprovinsi = async () => {
    //     const data = []
    //     const url = 'getprovinsi'
    //     let provinsi = await getall(url)
    //     setListProvinsi(provinsi)

    // }

    // const getkabupatenkota = async (id) => {
    //     const url = 'getkabkota'
    //     let kabkota = await getbyid(id, url)
    //     setListKabKota(kabkota)
    // }

    // const removesurattugas = async (idx) => {
    //     console.log(idx)
    //     const url = 'deletesurattugas'
    //     const hapus = await remove(idx, url)
    //     console.log(hapus)
    //     if (hapus === 1) {
    //         notification.open({
    //             message: 'Data Berhasil dihapus',
    //             description:
    //                 '',
    //             icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //         });
    //         getsurattugas()
    //     }
    // }

    // const generateSppd = async (id) => {
    //     const url = 'generatesppd'
    //     const hapus = await remove(id, url)
    //     console.log(hapus)
    //     if (hapus === 1) {
    //         notification.open({
    //             message: 'SPPD Berhasil digenerate',
    //             description:
    //                 '',
    //             icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //         });
    //         getsurattugas()
    //     }
    //}

    // const cariberdasarkantanngal = async () => {

    // }

    // const create = async (req, res) => {
    //     if (nomor_surat === '') {
    //         notification.open({
    //             message: 'Gagal Menyimnpan',
    //             description:
    //                 'Form tidak boleh kosong',
    //             icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
    //         });
    //     } else {
    //         let datas = {
    //             generatesppd,
    //             payload: {
    //                 nomor_surat,
    //                 format_nomor,
    //                 menimbang,
    //                 dasar,
    //                 tempat,
    //                 tanggal_berangkat,
    //                 tanggal_pulang,
    //                 provinsi,
    //                 kab_kota,
    //                 maksud,
    //                 penanda_tangan,
    //                 tanggaldikeluarkan,
    //             }
    //         }
    //         const apiurl = 'createsurattugas'
    //         console.log(apiurl)
    //         let createsurattugas = await createupdate(datas, apiurl)
    //         if (createsurattugas === 1) {
    //             notification.open({
    //                 message: 'Data Berhasil disimpan',
    //                 description:
    //                     '',
    //                 icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //             });
    //             getsurattugas()
    //             modalTrigger()
    //             //resetForm()
    //         } else {
    //             notification.open({
    //                 message: 'Gagal Menyimpan Data',
    //                 description:
    //                     '',
    //                 icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
    //             });
    //         }
    //     }
    // }

    // const update = async (req, res) => {
    //     if (nomor_surat === '') {
    //         notification.open({
    //             message: 'Gagal Menyimnpan',
    //             description:
    //                 'Form tidak boleh kosong',
    //             icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
    //         });
    //     } else {
    //         let datas = {
    //             generatesppd,
    //             id,
    //             payload: {
    //                 nomor_surat,
    //                 format_nomor,
    //                 menimbang,
    //                 dasar,
    //                 tempat,
    //                 tanggal_berangkat,
    //                 tanggal_pulang,
    //                 provinsi,
    //                 kab_kota,
    //                 maksud,
    //                 penanda_tangan,
    //                 tanggaldikeluarkan,
    //             }
    //         }
    //         const apiurl = 'updatesurattugas'
    //         console.log(apiurl)
    //         let createsurattugas = await createupdate(datas, apiurl)
    //         if (createsurattugas === 1) {
    //             notification.open({
    //                 message: 'Data Berhasil disimpan',
    //                 description:
    //                     '',
    //                 icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //             });
    //             getsurattugas()
    //             modalTrigger()
    //             //resetForm()
    //         } else {
    //             notification.open({
    //                 message: 'Gagal Menyimpan Data',
    //                 description:
    //                     '',
    //                 icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
    //             });
    //         }
    //     }
    // }

    // const createPelaksana = async (id) => {
    //     const id_surat_tugas = id
    //     const id_pegawai = Pelaksana
    //     let datas = {
    //         id_surat_tugas,
    //         id_pegawai,
    //     }
    //     const apiurl = 'createpelaksana'
    //     console.log(apiurl)
    //     let createpegawai = await createupdate(datas, apiurl)
    //     if (createpegawai === 1) {
    //         notification.open({
    //             message: 'Data Berhasil disimpan',
    //             description:
    //                 '',
    //             icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //         });
    //         getPelaksanaById(id)
    //         setPelaksana('')
    //     } else {
    //         notification.open({
    //             message: 'Gagal Menyimpan Data',
    //             description:
    //                 '',
    //             icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
    //         });
    //     }
    // }

    // const removePelaksana = async (idx) => {
    //     const url = 'deletepelaksana'
    //     const hapus = await remove(idx, url)
    //     console.log(hapus)
    //     if (hapus === 1) {
    //         notification.open({
    //             message: 'Data Berhasil dihapus',
    //             description:
    //                 '',
    //             icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
    //         });
    //         getPelaksanaById(id)
    //     }
    // }

    // const createorupdate = () => {
    //     isUpdate ? update() : create()
    // }

    // const createnew = async () => {
    //     modalTrigger()
    //     setIsUpdate(false)
    //     resetForm()
    // }

    //const resetForm = () => {
    // setNamaPegawai('')
    // setNomorSurat('')
    // setTanggalBerangkat(Date.now())
    // setTanggalPulang(Date.now())
    // setPeraturanPerjalanan('')
    // setProvinsi('')
    // setKabKota('')
    // setKodeAnggaran('')
    // setMaksud('')
    // setDasar('')
    // setWaktu('')
    // setTempatPertama('')
    // setTempatKedua('')
    // setTempatKetiga('')
    // setPenandaTangan('')
    // setPenandaTanganKeuangan('')
    // setKeterangan('')
    // setTanggalDikeluarkan(Date.now())
    //}

    // const caribyTanggal = async () => {
    //     const data = []
    //     const date1 = tanggalCari1;
    //     const date2 = tanggalCari2;
    //     let datas = {
    //         date1,
    //         date2
    //     }
    //     const apiurl = 'surattugasbydate'
    //     console.log(apiurl)
    //     let surattugas = await getallpost(datas, apiurl)
    //     let data_length = surattugas.length

    //     console.log(surattugas)

    //     for (let i = 0; i < data_length; i++) {
    //         data.push({
    //             no: i + 1,
    //             id: surattugas[i].id,
    //             maksud: surattugas[i].maksud,
    //             format_nomor: surattugas[i].format_nomor,
    //             nomor_surat: surattugas[i].nomor_surat,
    //             tgl_berangkat: surattugas[i].tanggal_berangkat,
    //             tgl_pulang: surattugas[i].tanggal_pulang,
    //         })
    //     }
    //     setListSuratTugas(data)
    // }

    // const caribySurat = async () => {
    //     const data = []
    //     let datas = {
    //         nomor_surat,
    //         format_nomor
    //     }
    //     const apiurl = 'surattugasbynomor'
    //     console.log(apiurl)
    //     let surattugas = await getallpost(datas, apiurl)
    //     let data_length = surattugas.length

    //     console.log(surattugas)

    //     for (let i = 0; i < data_length; i++) {
    //         data.push({
    //             no: i + 1,
    //             id: surattugas[i].id,
    //             maksud: surattugas[i].maksud,
    //             format_nomor: surattugas[i].format_nomor,
    //             nomor_surat: surattugas[i].nomor_surat,
    //             tgl_berangkat: surattugas[i].tanggal_berangkat,
    //             tgl_pulang: surattugas[i].tanggal_pulang,
    //         })
    //     }
    //     setListSuratTugas(data)
    // }



    // const columns = [
    //     {
    //         title: 'No',
    //         key: 'no',
    //         dataIndex: 'no',
    //     },
    //     {
    //         title: 'Nomor Surat',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //                 {record.nomor_surat}/{record.format_nomor}
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Tanggal',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //                 {moment(record.tgl_berangkat).format('LL')} -  {moment(record.tgl_pulang).format('LL')}
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Maksud',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //                 {renderHTML(record.maksud)}
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //                 <Button key="edit" onClick={() => getSuratTugasById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} ></Button>
    //                 <Button key="edit" onClick={() => modalTriggerPelaksana(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<UserAddOutlined />} ></Button>
    //                 <Popconfirm
    //                     title="Anda yakin menghapus Data ini?"
    //                     onConfirm={() => removesurattugas(record.id)}
    //                     // onCancel={cancel}
    //                     okText="Yes"
    //                     cancelText="No"
    //                 >
    //                     <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} ></Button>
    //                 </Popconfirm>
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Print',
    //         key: 'action',
    //         render: (text, record) => (
    //             <span>
    //                 <Button key="edit" onClick={() => generateSppd(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >Generate SPPD</Button>
    //                 <Button key="edit" onClick={() => modalTriggerPrintSt(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >Surat Tugas</Button>
    //             </span>
    //         ),
    //     },
    // ];


    const onChangeAkun = async (value) => {
        await setItem1(value)
        console.log(value)
        getKelompok(value)
    }

    const onChangeKelompok = async (value) => {
        await setItem2(value)
        console.log(value)
        getJenis(value)
    }

    const onChangeJenis = async (value) => {
        await setItem3(value)
        console.log(value)
        getObjek(value)
    }

    const onChangeObjek = async (value) => {
        await setItem4(value)
        console.log(value)
        getRincianObjek(value)
    }

    const onChangeRincianObjek = async (value) => {
        await setItem5(value)
        alert(`${item_1}.${item_2}.${item_3}.${item_4}.${value}`)
    }

    // const onChangeItem2 = value => {
    //     setKabKota(value)
    // }

    // const onChangeItem3  = (value, string) => {
    //     console.log(string)
    //     setTanggalBerangkat(string[0])
    //     setTanggalPulang(string[1])
    // }

    // const onChangeItem4 = (value, string) => {
    //     console.log(string)
    //     setTanggalCari1(string[0])
    //     setTanggalCari2(string[1])
    // }

    // const onChangeItem5 = (value, string) => {
    //     console.log(string)
    //     setTanggalDikeluarkan(string)
    // }

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
                extra={<Button type="dashed" onClick={modalTrigger}>Input Kode Rekening </Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >

            </Card>

            {/* <Table columns={columns} dataSource={listSuratTugas} /> */}

            <Modal
                title="Buat Surat Tugas"
                centered
                visible={modal}
                //onOk={createorupdate}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Kode Rekening</Label>
                </InputBoxAbove>
                <InputBoxBottom>
                    <Row style={{ width: "100%" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Label>Kode Akun</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kode Akun"
                                optionFilterProp="children"
                                onChange={onChangeAkun}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kode Akun</Option>
                                {listKodeRekening.map((data, index) =>
                                    <Option value={data.item_1}>{data.item_1} - {data.judul}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginTop: 10 }}>
                            <Label>Kode kelompok</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kode Kelompok"
                                optionFilterProp="children"
                                onChange={onChangeKelompok}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kode Kelompok</Option>
                                {listKelompok.map((data, index) =>
                                    <Option value={data.item_2}>{data.item_2} - {data.judul}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginTop: 10 }}>
                            <Label>Kode Jenis</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kode Jenis"
                                optionFilterProp="children"
                                onChange={onChangeJenis}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kode Kelompok</Option>
                                {listjenis.map((data, index) =>
                                    <Option value={data.item_3}>{data.item_3} - {data.judul}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginTop: 10 }}>
                            <Label>Kode Objek</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kode Objek"
                                optionFilterProp="children"
                                onChange={onChangeObjek}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kode Kelompok</Option>
                                {listObjek.map((data, index) =>
                                    <Option value={data.item_4}>{data.item_4} - {data.judul}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginTop: 10 }}>
                            <Label>Kode Rincian Objek</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Kode Rincian Objek"
                                optionFilterProp="children"
                                onChange={onChangeRincianObjek}
                            //value={format_nomor}
                            >
                                <Option value="">Pilih Kode Kelompok</Option>
                                {listRincianObjek.map((data, index) =>
                                    <Option value={data.item_5}>{data.item_5} - {data.judul}</Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                </InputBoxBottom>
            </Modal>

            {/* Modal Print SPPD */}


        </Content>
    )
}


export default Sppd;



