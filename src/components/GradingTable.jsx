import {useRef} from "react";

const grading = [...Array(10).keys()].map(e => ({value: e + 1, label: e + 1}));
const GradingTable = () => {
    const tbodyRef = useRef(null)
    const addButtonRef = useRef(null)
    const preRef = useRef(null)
    const formRef = useRef(null)
    const createSelectOption = (name) => {
        const select = document.createElement("select")
        select.name = name
        for (const item of grading) {
            const option = document.createElement("option")
            option.value = item.value
            option.innerText = item.label
            select.appendChild(option)
        }

        return select
    }
    const addStudent = () => {
        const curentRow = tbodyRef.current.children.length + 1
        if (curentRow === 10){
            addButtonRef.current.setAttribute("disabled", true)
        }
        const row = document.createElement("tr")
        const studentName = document.createElement("td")
        studentName.innerText = `Mahasiswa ${curentRow}`
        row.appendChild(studentName)
        const grading1 = document.createElement("td")
        grading1.appendChild(createSelectOption("aspek_penilaiain_1[]"))
        const grading2 = document.createElement("td")
        grading2.appendChild(createSelectOption("aspek_penilaiain_2[]"))
        const grading3 = document.createElement("td")
        grading3.appendChild(createSelectOption("aspek_penilaiain_3[]"))
        const grading4 = document.createElement("td")
        grading4.appendChild(createSelectOption("aspek_penilaiain_4[]"))
        row.appendChild(studentName)
        row.appendChild(grading1)
        row.appendChild(grading2)
        row.appendChild(grading3)
        row.appendChild(grading4)

        tbodyRef.current.appendChild(row)
    }

    const saveGrad = () => {
        const data = {
            aspek_penilaian_1: {},
            aspek_penilaian_2: {},
            aspek_penilaian_3: {},
            aspek_penilaian_4: {},
        }
        const tbodyLength = tbodyRef.current.children.length
        for (let i = 0; i < tbodyLength; i++) {
            data.aspek_penilaian_1[`mahasiswa_${i+1}`] = tbodyRef.current.children[i].children[1].firstChild.value
            data.aspek_penilaian_2[`mahasiswa_${i+1}`] = tbodyRef.current.children[i].children[2].firstChild.value
            data.aspek_penilaian_3[`mahasiswa_${i+1}`] = tbodyRef.current.children[i].children[3].firstChild.value
            data.aspek_penilaian_4[`mahasiswa_${i+1}`] = tbodyRef.current.children[i].children[4].firstChild.value
        }
        console.log(data);
        preRef.current.innerText = JSON.stringify(data)
    }
    return <>
        <form ref={formRef}>
            <table data-testid="grading-table">
                <thead></thead>
                <tbody ref={tbodyRef}>
                <tr>
                    <td>Mahasiswa 1</td>
                    <td>
                        <select name="aspek_penilaiain_1[]">
                            {grading.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                        </select>
                    </td>
                    <td>
                        <select name="aspek_penilaiain_2[]">
                            {grading.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                        </select>
                    </td>
                    <td>
                        <select name="aspek_penilaiain_3[]">
                            {grading.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                        </select>
                    </td>
                    <td>
                        <select name="aspek_penilaiain_4[]">
                            {grading.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        <button ref={addButtonRef} onClick={addStudent}>Tambah Mahasiswa</button>
        <button onClick={saveGrad} data-testid="submit-buton">Simpan</button>
        <pre ref={preRef} data-testid="result-container"></pre>
    </>
}

export default GradingTable
