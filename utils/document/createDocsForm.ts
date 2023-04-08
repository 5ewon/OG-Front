import { IFileTypes } from '@/components/DragDrop'
import { encodeContents } from './requestContents'

interface CreateDocsFormType {
	title: string
	enroll: number
	contents: string
	docsType: string
	files: IFileTypes[]
}

const createDocsForm = ({ title, enroll, contents, docsType, files }: CreateDocsFormType) => {
	const FormData = require('form-data')
	const data = new FormData()
	data.append(
		'request',
		new Blob([`{ "title": "${title}", "enroll":"${enroll}", "contents":"${encodeContents(contents)}", "docsType":"${docsType}"}`], {
			type: 'application/json',
		})
	)
	files.reverse().forEach((file) => data.append('files', file.object, file.object.name))

	return data
}

export default createDocsForm
