import { postService } from './postService'
import { categoryService } from './categoryService'
import { tagService } from './tagService'
import { commentService } from './commentService'

const Service = {
	post: postService,
	category: categoryService,
	tag: tagService,
	comment: commentService
}
export default Service
