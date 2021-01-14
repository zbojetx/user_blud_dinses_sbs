import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
//import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import moment from 'moment';
import NumberFormat from 'react-number-format'
import 'moment/locale/id';
import './../../assets/css/table.css'

moment.locale('id')

export function App(props) {

    const [blud, setBlud] = useState([])
    const [program, setProgram] = useState([])
    const [kegiatan, setKegiatan] = useState([])
    const [anggaran, setAnggaran] = useState([])
    const [rincian, setRincian] = useState([])


    useEffect(() => {
        getDataForPrint()
    }, [])



    const getDataForPrint = async () => {
        console.log(props.datas)
        console.log("FOR PRINT")
        const url = 'datastoprint'
        let datas = {
            kode_blud: props.dataToPrint.kode_blud,
            kode_program: props.dataToPrint.kode_program,
            kode_kegiatan: props.dataToPrint.kode_kegiatan,
            tahun_anggaran: props.dataToPrint.tahun_anggaran
        }

        let datatoprint = await getallpost(datas, url)
        console.log(datatoprint)

        setBlud(datatoprint.blud[0])
        setProgram(datatoprint.program[0])
        setKegiatan(datatoprint.kegiatan[0])
        setAnggaran(datatoprint.anggaran)
        setRincian(datatoprint.rincian)


    }

    const GetRincian = (props) => {
        let data = props.datas
        // let rincianall
        // let datas = {
        //     kode_blud: data.kode_blud,
        //     id_kode_rekening: data.kode_rekening,
        //     tahun_anggaran: data.tahun_anggaran
        // }
        // let url = 'getrinciananggaranbypar'
        // let data_rincian = getallpost(datas, url)
        //setRincian(data_rincian)

        // if( rincian.length === 0 ) {
        //     return ("KOSONG")
        // }else{
        //     rincianall = rincian.map((item, index) => {
        //         return (
        //             <div>
        //                 <h1>aa</h1>
        //                 </div>
        //         )
        //     })
        // }

        if (data.kode_akun !== '' && data.kode_kelompok !== '' && data.kode_jenis !== '' && data.kode_objek !== '' && data.kode_rincian_objek !== '') {
            return ("a")
        } else {
            return (<></>)
        }

        // return ("Hellll")

    }

    // const GetRincian = (props) => {
    //     // let data = props.datas
    //     // if (data.kode_akun !== '' && data.kode_kelompok !== '' && data.kode_jenis !== '' && data.kode_objek !== '' && data.kode_rincian_objek !== '') {
    //     //     return ("Heloo2")
    //     // }else{
    //     //     return ("Heloo")
    //     // }
    //     console.log(props.datas)
    //     return ("Hello")
    // }

    // async getdata(x, y, z) {
    //     let htmlreturn


    //     return ("AAA")

    //     // this.setState({
    //     //     datahtml: htmlreturn
    //     // })

    // }

    // async rincian() {
    //     //const { anggaran } = this.state
    //     return ("Hello World")

    // }
    return (
        <table style={{ width: '100%', fontSize: 12, color: 'black' }}>
            <table style={{ width: '100%', marginBottom: 10 }}>
                <tbody>
                    <tr >
                        <td style={{ width: '100%', padding: 8, color: 'black ', textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ', fontWeight: 'bold' }}>RENCANA BISNIS ANGGARAN (RBA)</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ' }}>UNIT KERJA BADAN LAYANAN UMUM DAERAH</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>KABUPATEN SAMBAS</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>TAHUN ANGGARAN 2019</span><br />
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }} />
            <table style={{ width: '100%', marginBottom: 20, borderBottom: '1px solid black', }}>
                <tr>
                    <td style={{ width: '15%' }}>BLUD</td>
                    <td style={{ width: '1%' }}>:</td>
                    <td style={{ width: '20%' }}>{blud.kode_blud}</td>
                    <td style={{ width: '69%' }}>{blud.nama_blud}</td>
                </tr>
                <tr>
                    <td>Pogram</td>
                    <td>:</td>
                    <td>{program.kode_program}</td>
                    <td>{program.nama_program}</td>
                </tr>
                <tr>
                    <td>Kegiatan</td>
                    <td>:</td>
                    <td>{kegiatan.kode_kegiatan}</td>
                    <td>{kegiatan.nama_kegiatan}</td>
                </tr>
                <tr>
                    <td>Lokasi Kegiatan</td>
                    <td>:</td>
                    <td>{blud.nama_blud}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Sumber Dana</td>
                    <td>:</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>

            <table style={{ width: '100%', borderTop: '1px solid black', borderBottom: '1px solid black', marginBottom: 20 }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid black', }} >
                        <td style={{ fontWeight: 'bold' }}>Indikator</td>
                        <td style={{ fontWeight: 'bold' }}>Tolak Ukur Kinerja</td>
                        <td style={{ fontWeight: 'bold' }}>Target Kinerja</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kelompok Sasaran Kegiatan</td>
                        <td>{blud.nama_blud}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Hasil</td>
                        <td>% terlaksananya upaya kesehatan penunjang puskesmas</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>Keluaran</td>
                        <td>terlaksananya upaya kesehatan penunjang puskesmas</td>
                        <td>1 tahun</td>
                    </tr>
                    <tr>
                        <td>Masukan</td>
                        <td>dana yang tersedia</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Capaian Program</td>
                        <td>terlaksananya upaya kesehatan penunjang puskesmas</td>
                        <td>100%</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: '100%' }} >
                <thead style={{ width: '100%', borderTop: '1px solid black', borderBottom: '1px solid black', fontWeight:'bold' }}>
                    <tr >
                        <td rowSpan={2}>Kode Belanja</td>
                        <td rowSpan={2}>Komponen Biaya</td>
                        <td colSpan={3}><center>Rincian Biaya</center></td>
                        <td rowSpan={2}>Jumlah</td>
                    </tr>
                    <tr >
                        <td>Kode Belanja</td>
                        <td>Komponen Biaya</td>
                        <td>Rincian Biaya</td>
                    </tr>

                </thead>
                <tbody className="table1">
                    {rincian.map((data, index) =>
                        < >
                            <tr style={{ width: '100%' }}>
                                <td><b>{data.rincian.kode_rekening}</b></td>
                                <td>{data.rincian.deskripsi_final}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><NumberFormat thousandSeparator={true} displayType={'text'} value={data.rincian.total} /></td>
                            </tr>
                            {data.rincianx.map((item, index) =>
                                <tr>
                                    <td></td>
                                    <td>{index + 1}. {item.uraian}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.satuan}</td>
                                    <td>{item.harga_satuan}</td>
                                    <td>{item.jumlah}</td>
                                </tr>
                            )}

                        </>
                    )}
                </tbody>
            </table>

        </table>
    );
}
