import React from 'react';
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

export class ComponentToPrint extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            blud: [],
            program: [],
            kegiatan: [],
            anggaran: [],
            rincian: [],
            kepala: [],
            verifikator: [],
            ext: [],
            total: []
        };

    }

    componentDidMount() {
        this.getDataForPrint()
        console.log(this.props.dataToPrint)
    }

    async getDataForPrint() {
        const url = 'datastoprint'
        let datas = {
            kode_blud: this.props.dataToPrint.kode_blud,
            kode_program: this.props.dataToPrint.kode_program,
            kode_kegiatan: this.props.dataToPrint.kode_kegiatan,
            tahun_anggaran: this.props.dataToPrint.tahun_anggaran
        }

        let datatoprint = await getallpost(datas, url)
        console.log(datatoprint)

        this.setState({
            blud: datatoprint.blud[0],
            program: datatoprint.program[0],
            kegiatan: datatoprint.kegiatan[0],
            anggaran: datatoprint.anggaran,
            rincian: datatoprint.rincian,
            kepala: datatoprint.kepaladinas[0],
            ext: datatoprint.other[0],
            total: datatoprint.total[0],
            verifikator: datatoprint.verifikator
        })
    }


    render() {
        const { blud, program, kegiatan, anggaran, rincian, kepala, verifikator, ext, total } = this.state
        return (
            <table style={{ width: '100%', fontSize: 12, color: 'black' }}>
                <table style={{ width: '100%', marginBottom: 10 }}>
                    <tbody>
                        <tr >
                            <td style={{ width: '100%', padding: 8, color: 'black ', textAlign: 'center' }}>
                                <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ', fontWeight: 'bold' }}>RENCANA BISNIS ANGGARAN (RBA)</span><br />
                                <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ' }}>UNIT KERJA BADAN LAYANAN UMUM DAERAH</span><br />
                                <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>KABUPATEN SAMBAS</span><br />
                                <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>TAHUN ANGGARAN {localStorage.getItem('tahun')}</span><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }} />
                <table style={{ width: '100%', marginBottom: 20, borderBottom: '1px solid black', fontSize: 12, }}>
                    <tr>
                        <td style={{ fontFamily: 'Bookman Old Style', width: '15%' }}>BLUD</td>
                        <td style={{ fontFamily: 'Bookman Old Style', width: '1%' }}>:</td>
                        <td style={{ fontFamily: 'Bookman Old Style', width: '20%' }}>{blud.kode_blud}</td>
                        <td style={{ fontFamily: 'Bookman Old Style', width: '69%' }}>{blud.nama_blud}</td>
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
                        <td>{ext.sumber_dana}</td>
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
                            <td>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total.total} /></td>
                        </tr>
                        <tr>
                            <td>Capaian Program</td>
                            <td>terlaksananya upaya kesehatan penunjang puskesmas</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </table>

                <table style={{ width: '100%' }} >
                    <thead style={{ width: '100%', borderTop: '1px solid black', borderBottom: '1px solid black', fontWeight: 'bold' }}>
                        <tr >
                            <td rowSpan={2}>KODE BELANJA</td>
                            <td rowSpan={2}>KOMPONEN BIAYA</td>
                            <td colSpan={3}><center>RINCIAN BIAYA</center></td>
                            <td rowSpan={2}>JUMLAH</td>
                        </tr>
                        <tr >
                            <td>VOLUME</td>
                            <td>SATUAN</td>
                            <td>HARGA SATUAN</td>
                        </tr>

                    </thead>
                    <tbody className="table1" style={{ borderBottom: '1px solid black', }}>
                        {rincian.map((data, index) =>
                            < >
                                <tr style={{ width: '100%' }}>
                                    <td><b>{data.rincian.kode_rekening}</b></td>
                                    <td>{data.rincian.deskripsi_final}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style={{ textAlign: 'right' }}><NumberFormat thousandSeparator={true} displayType={'text'} value={data.rincian.total} /></td>
                                </tr>
                                {data.rincianx.map((item, index) =>
                                    <tr>
                                        <td></td>
                                        <td>{index + 1}. {item.uraian}</td>
                                        <td>{item.volume}</td>
                                        <td>{item.satuan}</td>
                                        <td style={{ textAlign: 'right' }}><NumberFormat thousandSeparator={true} displayType={'text'} value={item.harga_satuan} /></td>
                                        <td style={{ textAlign: 'right' }}><NumberFormat thousandSeparator={true} displayType={'text'} value={item.jumlah} /></td>
                                    </tr>
                                )}

                            </>
                        )}
                    </tbody>
                    <tfoot style={{ width: '100%', borderTop: '1px solid black', borderBottom: '1px solid black', fontWeight: 'bold' }}>
                        <tr>
                            <td colSpan={5}><center><b>JUMLAH</b></center></td>
                            <td style={{ textAlign: 'right', fontWeight:'bold', fontSize:14 }}><NumberFormat thousandSeparator={true} displayType={'text'} value={total.total} /></td>
                        </tr>
                    </tfoot>
                </table>

                <table style={{ width: '100%', marginTop: 20, textAlign: 'center' }}>
                    <tr>
                        <td></td>
                        <td>Sambas,  {moment(ext.tanggaldikeluarkan).format('LL')} </td>
                    </tr>
                    <tr>
                        <td>{kepala.jabatan}</td>
                        <td>Kepala {blud.nama_blud}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><u><b>{kepala.nama_pegawai}</b></u></td>
                        <td><u><b>{blud.nama_kepala_blud}</b></u></td>
                    </tr>
                    <tr>
                        <td>NIP. {kepala.nip}</td>
                        <td>NIP. {blud.nip_kepala_blud}</td>
                    </tr>
                </table>
                <div style={{ padding: 10, marginTop: 30 }}>
                    <p style={{ fontSize: 12 }}>
                        Keterangan <br />
                        Tanggal pembahasan :  <br />
                        Catatan Hasil Pembahasan :  <br />
                        1. Penyusunan RBA agar mengacu pada standar satuan harga yang telah ditetapkan. <br />
                        2. Pelaksanaan kegiatan agar tetap memperhatikan prinsip efisiensi, efektifitas, dan dapat dipertanggungjawabkan.
                    </p>
                </div>

                <table style={{ width: '100%', border: '1px solid black', marginTop: 20 }}>
                    <thead style={{ width: '100%', borderTop: '1px solid black', borderBottom: '1px solid black', fontWeight: 'bold' }}>
                        <tr style={{ border: '1px solid black' }}>
                            <td colSpan={5}><center>Tim Verifikasi Blud</center></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black' }}>No</td>
                            <td style={{ border: '1px solid black' }}>Nama</td>
                            <td style={{ border: '1px solid black' }}>NIP</td>
                            <td style={{ border: '1px solid black' }}>Jabatan</td>
                            <td style={{ border: '1px solid black' }}>Tandatangan</td>
                        </tr>

                    </thead>
                    <tbody>
                        {verifikator.map((ver, index) =>
                            <tr style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{ver.nama_pegawai}</td>
                                <td style={{ border: '1px solid black' }}>{ver.nip}</td>
                                <td style={{ border: '1px solid black' }}>{ver.jabatan}</td>
                                <td style={{ border: '1px solid black' }}></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </table>
        );
    }

}