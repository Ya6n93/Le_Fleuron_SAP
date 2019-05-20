import JobService from "../services/job";

export default function ConvertToCSV() {
    JobService.getOwnCompany((error, response) => {
        let array = response.data.result;
        let str = "";

        for (let i = 0; i < array.length; i++) {
            let line = "";
            for (let index in array[i]) {
                if (line !== "") line += ",";

                line += array[i][index];
            }

            str += line + "\r\n";
        }
        console.log(array);
        console.log(str);
    });
}
