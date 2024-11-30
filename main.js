function submitRepairForm() {
    const repairId = document.getElementById('repairId').value;
    const repairDate = document.getElementById('repairDate').value;
    const repairTime = document.getElementById('repairTime').value;
    const repairReason = document.getElementById('repairReason').value;
    
    if (!repairDate || !repairTime || !repairReason.trim()) {
        alert('请填写完整的补卡信息');
        return;
    }
    
    // 显示成功提示
    const modal = document.getElementById('repairModal');
    const modalMessage = document.getElementById('repairModalMessage');
    modalMessage.innerHTML = '<span class="success-text">提交成功！</span><br><br>您已提交补卡申请，请您耐心等待审批...';
    modal.style.display = 'flex';
    
    backToClockPage();
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    }
}

// 登录函数
function login() {
    const workId = document.getElementById('workId').value;
    const password = document.getElementById('password').value;

    if(workId === '12001' && password === '122388') {
        // 保存登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userWorkId', workId);
        
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    } else {
        alert('工号或密码错误');
    }
}

// 退出登录功能
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userWorkId');
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 导航切换功能
const navItems = document.querySelectorAll('.nav-item');
const pages = {
    message: document.getElementById('messagePage'),
    workspace: document.getElementById('workspacePage'),
    discover: null,
    profile: document.getElementById('profilePage')
};

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // 显示对应的页面内容
        const target = this.getAttribute('href').substring(1);
        // 隐藏所有页面
        Object.values(pages).forEach(page => {
            if (page) page.style.display = 'none';
        });
        // 显示目标页面
        if (pages[target]) {
            pages[target].style.display = 'block';
        }
    });
});

// 打卡页面相关功能
function showClockPage() {
    document.getElementById('workspacePage').style.display = 'none';
    document.getElementById('clockPage').style.display = 'block';
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function backToWorkspace() {
    document.getElementById('clockPage').style.display = 'none';
    document.getElementById('workspacePage').style.display = 'block';
}

function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    timeElement.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
    dateElement.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
}

// 为打卡图标添加点击事件
document.querySelector('.function-item:last-child').addEventListener('click', showClockPage);

// 激励话语数组
const motivationalPhrases = [
    "新的一天，新的开始！加油！",
    "早安打卡，为梦想启航！",
    "今天也要元气满满哦！",
    "又是充满希望的一天！",
    "带着微笑开启美好的一天！",
    "今天也要保持热爱，奔赴山海！",
    "努力的人最幸运，加油！",
    "保持热爱，奋斗不止！",
    "今天也要继续加油呀！",
    "愿你带着光芒出发！"
];

function getRandomPhrase() {
    const index = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[index];
}

function showModal(message) {
    const modal = document.getElementById('clockModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('clockModal').style.display = 'none';
}

function clockIn() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    const message = `姓名：姚家荣\n工号：12001\n部门：总经办\n打卡时间：${timeString}\n\n${getRandomPhrase()}`;
    showModal(message);
    addClockRecord('上班打卡', now);
}

function clockOut() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    const message = `姓名：姚家荣\n工号：12001\n部门：总经办\n打卡时间：${timeString}\n\n${getRandomPhrase()}`;
    showModal(message);
    addClockRecord('下班打卡', now);
}

function addClockRecord(type, time) {
    const recordsList = document.getElementById('clockRecords');
    const record = document.createElement('div');
    record.className = 'record-item';
    record.innerHTML = `
        <span class="record-date">${time.toLocaleDateString()}</span>
        <span class="record-time">${type} ${time.toLocaleTimeString()}</span>
    `;
    recordsList.insertBefore(record, recordsList.firstChild);
}

// 补卡申请相关功能
function generateRepairId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `BK${year}${month}${day}${random}`;
}

function showRepairForm() {
    document.getElementById('clockPage').style.display = 'none';
    document.getElementById('repairPage').style.display = 'block';
    document.body.style.overflow = 'hidden';
    // 生成并设置申请编号
    document.getElementById('repairId').value = generateRepairId();
    
    // 设置申请时间为当前时间
    const now = new Date();
    const currentTime = now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    document.getElementById('applyTime').value = currentTime;
    
    // 设置补卡日期默认值为今天
    const today = now.toISOString().split('T')[0];
    document.getElementById('repairDate').value = today;
}

function backToClockPage() {
    document.getElementById('repairPage').style.display = 'none';
    document.getElementById('clockPage').style.display = 'block';
    document.body.style.overflow = '';
}

function closeRepairModal() {
    document.getElementById('repairModal').style.display = 'none';
}

// 显示申请分类弹窗
function showApplyModal() {
    const modal = document.getElementById('applyModal');
    modal.style.display = 'flex';
}

// 关闭申请分类弹窗
function closeApplyModal() {
    document.getElementById('applyModal').style.display = 'none';
}

// 为申请图标添加点击事件
document.querySelector('.function-item:nth-child(2)').addEventListener('click', showApplyModal);

// 点击弹窗外部关闭弹窗
document.getElementById('applyModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeApplyModal();
    }
});

// 添加用户状态数组
const userStatuses = [
    { icon: 'ri-user-follow-line', text: '打工中' },
    { icon: 'ri-plane-line', text: '出差中' },
    { icon: 'ri-home-6-line', text: '请假中' },
    { icon: 'ri-team-line', text: '会议中' },
    { icon: 'ri-book-open-line', text: '培训中' }
];

// 当前状态索引
let currentStatusIndex = 0;

// 切换状态函数
function toggleStatusList() {
    const statusList = document.getElementById('statusList');
    statusList.classList.toggle('show');
}

function selectStatus(index) {
    currentStatusIndex = index;
    const status = userStatuses[currentStatusIndex];
    
    const statusTag = document.querySelector('.status-tag');
    statusTag.innerHTML = `
        <i class="${status.icon}"></i>
        <span>${status.text}</span>
        <i class="ri-arrow-down-s-line"></i>
    `;
    
    document.getElementById('statusList').classList.remove('show');
}

// 点击其他地方关闭状态列表
document.addEventListener('click', function(e) {
    const statusDropdown = document.querySelector('.status-dropdown');
    const statusList = document.getElementById('statusList');
    if (!statusDropdown.contains(e.target) && statusList.classList.contains('show')) {
        statusList.classList.remove('show');
    }
});