module.exports.run = (client , message) => {
  var rad = Math.PI/180;
var canvas;
var context;
var image;
var w, h;

function setImage(img){
	canvas = document.getElementById("img");
	context = canvas.getContext('2d');
	
	// �摜�ǂݍ���
	image = new Image();
	image.src = img;
	// �ǂݍ��ݏI����҂�
	image.onload = function() {
		w = image.width, h = image.height;
		if(w % 2 != 0)
			w--;
		if(h % 2 != 0)
			h--;
		// �`��̈���摜�̃T�C�Y�Ƀ��T�C�Y
		canvas.width = w;
		canvas.height = h;
		// �摜�`��
		context.drawImage(image, 0, 0);
	}
}

/*
** �摜�ϊ�
*/
var imgConvert = (function(){
	var draw;
	// �ϊ��ƕ`��p�֐�
	function Draw(sx, sy, sw, sh, dx, dy, dw, dh){
		// �`��̈���N���A
	    context.clearRect(0, 0, w, h);
        // �֐���Ԃ��i�����֐��j
		return function (mX, mY) {
			var W = w, H = h;
			if(mX == 1) W = 0;
			if(mY == 1) H = 0;
			context.setTransform(mX, 0, 0, mY, W, H);
			context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		}
	}
	// ������
	this.Init = function(){
		draw = new Draw(0, 0, w, h, 0, 0, w, h);
		draw(1, 1);
	}

	// ���������g�p
	this.Left = function () {
        // �ϊ��Ɏg���̈���������ɐݒ�
	    draw = new Draw(0, 0, w / 2, h, 0, 0, w / 2, h);
        // ���ʂɕ`��
	    draw(1, 1);
        // x�����������]���ĕ`��
		draw(-1, 1);
	}
	// �E�������g�p
	this.Right = function(){
		draw = new Draw(w/2, 0, w, h, w/2, 0, w, h);
		draw(1, 1);
		draw(-1, 1);
	}
	// �㔼�����g�p
	this.Top = function(){
		draw = new Draw(0, 0, w, h/2, 0, 0, w, h/2);
		draw(1, 1);
		draw(1, -1);
	}
	// ���������g�p
	this.Bottom = function(){
		draw = new Draw(0, h/2, w, h, 0, h/2, w, h);
		draw(1, 1);
		draw(1, -1);
	}

	// ������g�p
	this.tLeft = function(){
		draw = new Draw(0, 0, w/2, h/2, 0, 0, w/2, h/2);
		draw(1, 1);
		draw(-1, 1);
		draw(1, -1);
		draw(-1, -1);
	}
	// �E����g�p
	this.tRight = function(){
		draw = new Draw(w/2, 0, w, h/2, w/2, 0, w, h/2);
		draw(1, 1);
		draw(-1, 1);
		draw(1, -1);
		draw(-1, -1);
	}
	// �������g�p
	this.bLeft = function(){
		draw = new Draw(0, h/2, w/2, h, 0, h/2, w/2, h);
		draw(1, 1);
		draw(-1, 1);
		draw(1, -1);
		draw(-1, -1);
	}
	// �E�����g�p
	this.bRight = function(){
		draw = new Draw(w/2, h/2, w, h, w/2, h/2, w, h);
		draw(1, 1);
		draw(-1, 1);
		draw(1, -1);
		draw(-1, -1);
	}
	return this;
})();

// �摜�̓ǂݍ���
function loadImg(){
	if (document.getElementById('loadImg').files[0].type.match('image.*')) {
		var img = document.getElementById('loadImg').files[0];
		var info = "name:" + img.name + " size:" + img.size;
		document.getElementById('list').innerHTML = info;
		var fr = new FileReader();
		// �ǂݍ��ݏI����҂�
		fr.onload = function onFileLoad(e) {
			setImage(e.target.result);
		}
		fr.readAsDataURL(img);
	}else{
		alert("�摜�t�@�C�����w�肵�ĉ�����");
	}
}

// URL�擾
function url() {
	var url = document.getElementById("URL").value;
	setImage(url);
}

// �h���b�O���h���b�v�œǂݍ���
function onDropFile(e) {
    e.preventDefault();
    var img = e.dataTransfer.files[0];
    if (img.type.match('image.*')) {
        var fr = new FileReader();
        // �ǂݍ��ݏI����҂�
        fr.onload = function onFileLoad(e) {
            setImage(e.target.result);
        }
        fr.readAsDataURL(img);
    } else {
        alert("�摜�t�@�C�����w�肵�ĉ�����");
    }
}

// �f�t�H���g�������L�����Z��
function onCancel(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
};

window.addEventListener('load', function (){
    setImage("ika.jpg");
    // �h���b�O���h���b�v�ɑΉ�
    document.getElementById("img").addEventListener("dragover", onCancel, false);
    document.getElementById("img").addEventListener("dragenter", onCancel, false);
    document.getElementById("img").addEventListener("drop", onDropFile, false);
}, false);

}