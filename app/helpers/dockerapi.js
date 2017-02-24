import shelljs from "shelljs";


const callDockerSocker = function(method, path, callback) {
    const formattedCall = `curl --unix-socket /var/run/docker.sock -s -X ${method} http:/v1.26/${path}`;
    // console.log(formattedCall);
    shelljs.exec(formattedCall, (error, stdout, stderr) => {
        if (error) {
            callback(error);
        } else {
            if (stdout.length) {
                callback(null, JSON.parse(stdout));
            } else {
                callback(null, []);
            }
        }
    });
} // close callDockerSocker

export default {
    get(path, callback) {
        return callDockerSocker("GET", path, callback)
    }, // close get
    delete(path, callback) {
        return callDockerSocker("DELETE", path, callback)
    } // close delete
} // close exports default
