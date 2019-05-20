<template>
	<div>
		<div id="parentx">

			<vs-button @click="active=!active" color="primary" type="filled"><i class="fas fa-bars"></i></vs-button>
			<vs-sidebar position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

				<div class="header-sidebar" slot="header">
					<vs-avatar  size="70px" :src="jobs[0].createdBy.company.logo"/>
					<p>{{jobs[0].createdBy.company.name}}</p>
				</div>
				<vs-divider icon="Outils" position="left">
				</vs-divider>

				<vs-sidebar-item @click="addArray= !addArray">
					<i class="fas fa-plus-square fa-3x"></i>
				</vs-sidebar-item>
				<div class="ui input">
					<input v-model="newArray" type="text" v-if="addArray" @keyup.enter="addTab">
				</div>

				<vs-sidebar-item @click="deleteArray= !deleteArray">
					<i class="fas fa-trash fa-3x"></i>
				</vs-sidebar-item>

				<vs-divider icon="Offres" position="left">
				</vs-divider>

				<template v-for="job in jobs">
					<vs-sidebar-item index="3" :icon="job.title">
					</vs-sidebar-item>
				</template>
				<vs-sidebar-item index="1" icon="">
					<router-link tag="button" class="ui button" to="/entreprise/add/offer" type="submit"><i class="fas fa-file-alt fa-2x"></i><br>Ajouter une offre</router-link>
				</vs-sidebar-item>
				<div class="footer-sidebar" slot="footer">
					<vs-button icon="" color="danger" type="flat">Se déconnecter</vs-button>
				</div>
			</vs-sidebar>
		</div>
		<div class="card-scene">
			<Container
				orientation="horizontal"
				@drop="onColumnDrop($event)"
				drag-handle-selector=".column-drag-handle"
				@drag-start="dragStart"
			>
				<Draggable v-for="column in scene.children" :key="column.id">
					<div :class="column.props.className">
						<div class="card-column-header">
							<span class="column-drag-handle">&#x2630;</span>
							{{ column.name }}
							<div @click="deleteTab(column.id)" v-if="deleteArray">
								<i id="cross" class="fas fa-times fa-1x"></i>
							</div>
						</div>
						<Container
							group-name="col"
							@drop="(e) => onCardDrop(column.id, e)"
							@drag-start="(e) => log(false, e)"
							@drag-end="(e) => log(true, e)"
							:get-child-payload="getCardPayload(column.id)"
							drag-class="card-ghost"
							drop-class="card-ghost-drop"
						>
							<template v-for="(card, i) in column.children">
								<Draggable :key="card.id">
									<div class="ui card">
										<div class="content">
											<div class="right floated meta">23 ans</div>
											<img class="ui avatar image" :src="card.data.createdBy.profile.avatar"> {{ card.data.createdBy.profile.firstname }}
										</div>
										<div class="image">
											<img>
										</div>
										<vueStars id="star"></vueStars>
										<div class="content">
                    <span class="right floated">

                    </span>
											Ingénieur
										</div>
										<div class="extra content" v-if="card.data.comments[0]">
											{{ card.data.comments[0].message }}
										</div>
										<template v-for="(comment, i) in card.data.comments" v-if="activeComments[card.data._id]">
											<div class="extra content" v-if="i !== 0">
												{{ comment.message }}
											</div>
										</template>
										<div class="extra content">
											<div class="ui large transparent left icon input">
												<input type="text" placeholder="Commentaires" v-model="newComment[card.data._id]" @keyup.enter="comment(card.data._id, i)">
												<div @click="toggle(card.data._id)">
													<i id="point" class="fas fa-ellipsis-h fa-1x"></i>
												</div>
											</div>
										</div>
										<div class="contact">
											<button class="ui left attached button" @click="contact(card.data._id)">Contacter</button>
											<button class="right attached ui button" @click="getCv(card.data._id)">Acceder au CV</button>
										</div>
									</div>
								</Draggable>
							</template>
						</Container>
					</div>
				</Draggable>
			</Container>
		</div>
	</div>
</template>

<script>
	import { Container, Draggable } from 'vue-smooth-dnd';
	import { applyDrag, generateItems } from '../utils/helpers';
	import JobService from "../services/job";
	import vueStars from 'vue-stars';

	export default {
		name: 'Cards',
		components: {Container, Draggable, vueStars},
		data () {
			return {
				jobs: null,
				scene: {},
				active: false,
				addArray: false,
				modifyArray: false,
				newArray: null,
				deleteArray: false,
				newComment: [],
				activeComments: {},
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm=> {
				vm.init(vm);
			})
		},
		beforeRouteLeave(to, from, next) {
			this.active = false;
			setTimeout(() => {
				next();
			}, 0);
		},
		methods: {
			onColumnDrop (dropResult) {
				const scene = Object.assign({}, this.scene);
				scene.children = applyDrag(scene.children, dropResult);
				this.scene = scene
			},
			onCardDrop (columnId, dropResult) {
				if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
					const scene = Object.assign({}, this.scene);
					const column = scene.children.filter(p => p.id === columnId)[0];
					const columnIndex = scene.children.indexOf(column);
					const newColumn = Object.assign({}, column);
					newColumn.children = applyDrag(newColumn.children, dropResult);
					if (dropResult.addedIndex !== null)
						this.changeStatus(columnId, dropResult.payload.id);
					scene.children.splice(columnIndex, 1, newColumn);
					this.scene = scene;
				}
			},
			getCardPayload (columnId) {
				return index => {
					return this.scene.children.filter(p => p.id === columnId)[0].children[index];
				}
			},
			dragStart () {
				console.log('drag started')
			},
			log (end, e) {

			},
			toggle(i) {
				if (this.activeComments[i] === true) {
					this.$set(this.activeComments, i, false);
				} else {
					this.$set(this.activeComments, i, true);
				}
			},
			changeStatus(newStatus, candidatureId) {
				JobService.changeCandidatureStatus({
					newStatus: newStatus,
					candidatureId: candidatureId,
					jobId: this.jobs[0]._id
				}, (err, response) => {

				});
			},
			comment(candidatureId, i) {
				if (this.newComment[candidatureId]) {
					JobService.comment({candidatureId: candidatureId, message: this.newComment[candidatureId], jobId: this.jobs[0]._id}, (err, response) => {
						this.newComment[candidatureId] = null;
						this.init(this);
					});
				}
			},
			addTab() {
				this.addArray = false;
				JobService.addArray({jobId: this.jobs[0]._id, category: this.newArray}, (err, response) => {
					this.init(this);
				});
			},
			deleteTab(id) {
				this.deleteArray = false;
				JobService.deleteCategory({jobId: this.jobs[0]._id, category: id}, (err, response) => {
					this.init(this);
				});
			},
			init(vm) {
				JobService.getOwnCompany((err, response) => {
					try {
						vm.jobs = response.data.result;
					} catch (e) {
						vm.jobs = response;
					}
					let first = vm.jobs[0];

					if (!vm.jobs[0])
						return vm.$router.push('/entreprise/add/offer');

					vm.scene = {
						type: 'container',
						props: {
							orientation: 'horizontal'
						},
						children: generateItems(null, first.categories.length, i => ({
							id: first.categories[i],
							type: 'container',
							name: first.categories[i],
							props: {
								orientation: 'vertical',
								className: 'card-container'
							},
							children: generateItems(first.categories[i], first.candidatures.length, j => ({
								type: 'draggable',
								id: first.candidatures[j].createdBy._id,
								props: {
									className: 'card',
								},
								data: first.candidatures[j]
							}))
						}))
					};
				});
			},
			contact(candidatureId) {
				JobService.getCandidatureById(candidatureId, (err, response) => {
					response = response.data.result;
					console.log(response);
					this.$modal.show('dialog', {
						title: response.candidatures[0].createdBy.profile.firstname,
						text: 'You are too awesome',
						buttons: [
							{
								title: 'Fermer'
							}
						]
					});
				});
			},
			getCv(candidatureId) {
				JobService.getCandidatureById(candidatureId, (err, response) => {
					response = response.data.result;
					console.log(response);
					this.$modal.show('dialog', {
						title: 'CV: ' + response.candidatures[0].createdBy.profile.firstname,
						text: 'You are too awesome',
						buttons: [
							{
								title: 'Fermer'
							}
						]
					});
				});
			}
		}
	}
</script>
<style>
	#cross {
		float: right;
		cursor: pointer;
		margin-top: -15px;
	}
	.draggable-item {
		height: 50px;
		line-height: 50px;
		text-align: center;
		width: 100%;
		display: block;
		background-color: #fff;
		outline: 0;
		border: 1px solid rgba(0, 0, 0, .125);
		margin-bottom: 2px;
		margin-top: 2px;
		cursor: default;
		user-select: none;
	}

	.draggable-item-horizontal {
		height: 300px;
		padding: 10px;
		line-height: 100px;
		text-align: center;
		/* width : 200px; */
		display: block;
		background-color: #fff;
		outline: 0;
		border: 1px solid rgba(0, 0, 0, .125);
		margin-right: 4px;
		cursor: default;
	}

	.dragging {
		background-color: yellow;
	}

	.card-scene {
		padding: 50px;
		/* background-color: #fff; */
	}

	.card-container {
		width: 320px;
		padding: 10px;
		margin: 5px;
		margin-right: 45px;
		background-color: #f3f3f3;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
	}

	.card {
		margin: 5px;
		/* border: 1px solid #ccc; */
		background-color: white;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
		padding: 10px;
	}

	.card-column-header {
		font-size: 20px;
		text-align: left;
		padding-bottom: 10px;
		padding-top: 5px;
	}

	.column-drag-handle {
		cursor: move;
		padding: 5px;
	}

	.card-ghost {
		transition: transform 0.18s ease;
		transform: rotateZ(5deg)
	}

	.card-ghost-drop {
		transition: transform 0.18s ease-in-out;
		transform: rotateZ(0deg)
	}

	.opacity-ghost {
		transition: all .18s ease;
		opacity: 0.8;
		/* transform: rotateZ(5deg); */
		background-color: cornflowerblue;
		box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
	}

	.opacity-ghost-drop {
		opacity: 1;
		/* transform: rotateZ(0deg); */
		background-color: white;
		box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
	}


	.form-demo {
		width: 650px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
		display: flex
	}

	.form {
		flex: 3;
		/* width: 500px; */
		/* background-color: #f3f3f3; */
		border: 1px solid rgba(0, 0, 0, .125);
		border-radius: 6px;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
	}

	.form-fields-panel {
		flex: 1;
		margin-right: 50px;
	}


	.form-ghost {
		transition: 0.18s ease;
		box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.08);
	}

	.form-ghost-drop {
		box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.0);
	}
	.card-scene {
		background-image: url("../assets/trello.png");
		padding-bottom: 500px;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.ui.card:first-child {
		margin-top:10px;
		margin-left:5px;
	}
	.ui.card .avatar img, .ui.card img.avatar, .ui.cards>.card .avatar img, .ui.cards>.card img.avatar {
		width: 50px;
		height: 50px;
	}
	.ui.avatar.image {
		float: left;
	}
	.header-sidebar {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
	}
	.footer-sidebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.vs-button-primary.vs-button-filled{
		float: right;
		margin-right: 5px;
		width: 40px;
		margin-top: 5px;
	}
	.smooth-dnd-container.horizontal {
		overflow-x: auto;
	}
	.contact {
		padding-top: 20px;
		padding-bottom: 10px;
	}
	.ui.transparent[class*="left icon"].input>input {
		padding-left: 0!important;
		text-align: center;
	}
	#point {
		float: right;
		position: absolute;
		cursor: pointer;
	}
	#star {
		margin-left: 35%;
		margin-bottom: 20px;
	}
</style>