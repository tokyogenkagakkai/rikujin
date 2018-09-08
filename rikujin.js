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
    var select = document.getElementById(aSelect);
    for (var i = 0; i < aOptions.length; ++i) {
        var option = document.createElement('option');
        option.innerHTML = aOptions.charAt(i);
        select.appendChild(option);
    }
}
var jikkan = '甲乙丙丁戊己庚辛壬癸';
var junisi = '子丑寅卯辰巳午未申酉戌亥';
window.addEventListener('load', function () {
    makeBan('tiban', 'tiban-container');
    setBan('tiban', junisi);

    makeBan('tenban', 'tenban-container');
    setBan('tenban', junisi);

    setOptions('jikkan', jikkan);
    setOptions('junisi', junisi);

    var j = document.getElementById('junisi');
    j.addEventListener('change', function (e) {
        var selected = e.target.value;
        var gessyo = document.getElementById('gessyo');
        gessyo.value = sigo(selected);
    }, false);
}, false);
// 支に対して支合を計算する
// 支は index ではなく文字で指定する
function sigo(aSi) {
    var pairs = [
        '子丑', '辰酉',
        '亥寅', '申巳',
        '卯戌', '午未',
    ];
    var found = -1;
    for (var pair of pairs) {
        var index = pair.indexOf(aSi);
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
