const BASE = 'http://localhost:8080/api/'

function createIssue(item) {
    return axios({
        method: 'post',
        url: BASE + 'issues/',
        data: item
    });
}

//TODO create issue type
//Change the enum...
//Maybe issue type itself is anoher document LOL


function fetchIssueById(id) {//fetch all Issues of a user
    return axios.get(BASE + 'issues/', + id);
}

function fetchProjectsIssues(id) {//fetch all Issues in a project
    return axios.get(BASE + 'issues/project/' + id);
}

function fetchByProjectAndIssueType(id, type) {//fetch all Issues of a particular type in a project
    return axios.get(BASE + 'issues/project/' + id + 'issueType/' + type);
}

function fetchByAssigneeAndIssueType(id, type) {//fetch all Issues of a particular type of an assignee
    return axios.get(BASE + 'issues/assignee/' + id + 'issueType/' + type);
}

function fetchByReporteeAndIssueType(id, type) {//fetch all Issues of a particular type of a reportee
    return axios.get(BASE + 'issues/reportee/' + id + 'issueType/' + type);
}

function fetchChildren(id) {//fetch all chilren of an Issues 
    return axios.get(BASE + 'issues/' + id + '/children'); //e.g. subtasks of a task    or   tasks of an epic 
}

function fetchParent(id) {//fetch all chilren of an Issues 
    return axios.get(BASE + 'issues/' + id + '/parent'); //e.g. subtasks of a task    or   tasks of an epic 
}

function updateIssueById(id, update) {//fetch all Issues of a user
    return axios.put(BASE + 'issues/', + id, update);
}

function deleteIssueById(id) {//fetch all Issues of a user
    return axios.delete(BASE + 'issues/', + id);
}
