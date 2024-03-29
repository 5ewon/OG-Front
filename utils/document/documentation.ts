import { decodeContents } from './requestContents'
import React, { useState } from 'react'

const documentation = (content: string) => {
	let color = content.substring(content.indexOf('선색=(')+4, content.indexOf(');'));
	// console.log(content.indexOf('선색=(')+4)
	// let color;
	// let a = document.getElementById('a');
	// color = a?.style.backgroundColor;
	console.log(content.indexOf('선색=(')+4);
	console.log(color)

	content = content
		.replace(/<틀>/gi, `<details open><table class="frame_table" style="width:100%;" >`)
		.replace(/<\/틀>/gi, `</table></details>`)
		.replace(/<틀제목/gi, `<summary id="a" class="frame_caption" `)
		.replace(/<\/틀제목>/gi, `<br><span style="color:white; font-size:14px;">[ 펼치기 · 접기 ]</span></summary>`)
		.replace(/<행>/gi, `<tr>`)
		.replace(/<\/행>/gi, `</tr>`)
		.replace(/<열/gi, `<td class="frame_td" `)
		// .replace(/<열/gi, `<td class="frame_td" `)
		.replace(/스타일={{/gi, `style=" `)
		.replace(/배경색=\(/gi, `;background-color:`)
		.replace(/글자색=\(/gi, `;color:`)
		.replace(/<\/열>/gi, `</td>`)
		.replace(/가로병합={{/gi, ` colspan="`)
		.replace(/세로병합={{/gi, ` rowspan="`)
		.replace(/}}/gi, `"`)
		.replace(/\);/gi, '')
		.replace(/<항목>/gi, `<li style="list-style: disc;">`)
		.replace(/<어록>/gi, `<div class="analects" >`)
		.replace(/<\/어록>/gi, `</div>`)
		.replace(/<블록>/gi, `<div class="block" >`)
		.replace(/<\/블록>/gi, `</div>`)
		.replace(/<강조>/gi, `<strong>`)
		.replace(/<\/강조>/gi, `</strong>`)
		.replace(/<빨강>/gi, `<span style="color:red;">`)
		.replace(/<\/빨강>/gi, `</span>`)
		.replace(/<하양>/gi, `<span style="color:white;">`)
		.replace(/<\/하양>/gi, `</span>`)
		.replace(/<노랑>/gi, `<span style="color:#ffd400;">`)
		.replace(/<\/노랑>/gi, `</span>`)
		.replace(/<취소선>/gi, `<del style="color:#ccc;">`)
		.replace(/<\/취소선>/gi, `</del>`)
		.replace(/<소제목>/gi, `<div class="subtitle" >`)
		.replace(/<\/소제목>/gi, `</div><hr/>`)
		.replace(/<<사진>>:{.*}/gi, `<div class="image-preview">사진 위치</div>`)
		.replace(/<외부링크 문서={/gi, `<a class="link" target="_blank" href="`)
		.replace(/<링크 문서={/gi, `<a class="link" target="_blank" href="/docs/`)
		.replace(/}>/gi, `">`)
		.replace(/<\/외부링크>/gi, `</a>`)
		.replace(/<\/링크>/gi, `</a>`)
		.replace(/<br\/>/gi, `<br/>`)
		.replace(/<</gi, `<img src="`)
		.replace(/>>:{/gi, `" alt='' style="width:`)
		.replace(/}/gi, `%;" />`)
		.replace(/&#.*;/gi, ``)

	return decodeContents(content)
}

export default documentation
