function setBan(aId, aItems) {
    var table = document.getElementById(aId);
    for (var i = 0; i < aItems.length; ++i) {
        var cell = table.querySelector('.c' + i);
        cell.innerHTML = aItems.charAt(i);
    }
}
function makeBan(aId, aInto) {
    var html = `
    <table id="${aId}">
        <tr><td class="c5"></td><td class="c6"></td><td class="c7"></td><td class="c8"></td></tr>
        <tr><td class="c4"></td>       <td colspan="2" rowspan="2"></td><td class="c9"></td></tr>
        <tr><td class="c3"></td>                                        <td class="c10"></td></tr>
        <tr><td class="c2"></td><td class="c1"></td><td class="c0"></td><td class="c11"></td></tr>
    </table>`;
    document.getElementById(aInto).innerHTML = html;
}
function setOptions(aSelect, aOptions) {
    for (var i = 0; i < aOptions.length; ++i) {
        var option = document.createElement('option');
        option.innerHTML = aOptions.charAt(i);
        aSelect.appendChild(option);
    }
}
var jikkan = '甲乙丙丁戊己庚辛壬癸';
var junisi = '子丑寅卯辰巳午未申酉戌亥';
window.addEventListener('load', function () {
    makeBan('tiban', 'tiban-container');
    setBan('tiban', junisi);

    makeBan('tenban', 'tenban-container');
    setBan('tenban', junisi);

    makeKansi('getu');
    makeKansi('niti');

    document.querySelector('#niti .kan').addEventListener('change',
    function (e) {
        var selected = e.target.value;
        var yorimiya = document.getElementById('yorimiya');
        yorimiya.value = calcYorimiya(selected);

        updateKuubou();
    }, false);
    document.querySelector('#niti .si').addEventListener('change',
    function (e) {
        updateKuubou();
    }, false);

    document.querySelector('#getu .si').addEventListener('change',
    function (e) {
        var selected = e.target.value;
        var gessyo = document.getElementById('gessyo');
        gessyo.value = sigo(selected);
    }, false);
}, false);

// 月支に対して支合を計算する
// 月支は index ではなく文字で指定する
function sigo(aGessi) {
    var pairs = [
        '子丑', '辰酉',
        '亥寅', '申巳',
        '卯戌', '午未',
    ];
    var found = -1;
    for (var pair of pairs) {
        var index = pair.indexOf(aGessi);
        if (index == -1) {
            continue;
        }
        // 支が含まれるペアを特定したら
        // ペアの相手側を選ぶ
        var selection = 1 - index;
        return pair.charAt(selection);
    }
    return null;
}

// 日干に対して寄宮を計算する
// 日干は index ではなく文字で指定する
function calcYorimiya(aNikkan) {
    var yorimiyas = '寅辰巳未巳未申戌亥丑';
    var index = jikkan.indexOf(aNikkan);
    return yorimiyas[index];
}

function makeKansi(aId) {
    var div = document.getElementById(aId);
    div.innerHTML = `
    <select class="kan"></select>
    <select class="si"></select>
    `;
    var kan = div.querySelector('.kan');
    var si = div.querySelector('.si');
    setOptions(kan, jikkan);
    setOptions(si, junisi);
}

function updateKuubou() {
    var nikkan = document.querySelector('#niti .kan').value;
    var nissi = document.querySelector('#niti .si').value;
    var kuubou = document.getElementById('kuubou');
    kuubou.value = calcKuubou(nikkan, nissi).split('').join('・');
}

function calcKuubou(aNikkan, aNissi) {
    var kuubous = ['子丑', '寅卯', '辰巳', '午未', '申酉', '戌亥'];
    var syuntyus = [
        ['甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'],
        ['甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑'],
        ['甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯'],
        ['甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳'],
        ['甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未'],
        ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉']
    ];
    for (var i = 0; i < syuntyus.length; ++i) {
        var found = syuntyus[i].indexOf(aNikkan + aNissi);
        if (found >= 0) {
            return kuubous[i];
        }
    }
    return null;
}