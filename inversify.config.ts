import {Container, ContainerModule, interfaces} from "inversify";
import {App, AppArgs} from "./app/app";
import {
    IApp, IClassroomCreator, IStudentViewCreator, ITeacherViewCreator, IVueConfigurer, ITopicCreator,
    IHeaderCreator, IDataSubscriber
} from "./interfaces";
import {TYPES} from "./types";
import {VueConfigurer, VueConfigurerArgs} from "./app/vueConfigurer";
import {ClassroomCreator, ClassroomCreatorArgs} from "./app/components/classroom/classroom";
import {StudentViewCreator, StudentViewCreatorArgs} from "./app/components/studentView/studentView";
import {Store} from "vuex";
import Vuex from 'vuex'
import Vue from 'vue'
import {default as AppStore, AppStoreArgs} from "./app/appStore";
import {TeacherViewCreator, TeacherViewCreatorArgs} from "./app/components/teacherView/teacherView";
import {TopicCreator, TopicCreatorArgs} from "./app/components/topic/topic";
import {HeaderCreator, HeaderCreatorArgs} from "./app/components/header/header";
import firebaseConfig = require('./app/firebaseConfig.json')
import * as firebase from 'firebase'
import Reference = firebase.database.Reference;
import {TAGS} from "./app/tags";
import {DataSubscriber, DataSubscriberArgs} from "./app/dataSubscriber";

firebase.initializeApp(firebaseConfig)
export const myContainer = new Container()
// export const components =
export const appStoreArgs
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<AppStoreArgs>(TYPES.AppStoreArgs).to(AppStoreArgs)

})
export const classroom1QuestionsRef = firebase.database().ref('classrooms/1')
export const references
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<Reference>(TYPES.FirebaseReference).toConstantValue(classroom1QuestionsRef)
        .whenTargetTagged(TAGS.ClassRoom1QuestionsRef, true)

    })


export const components
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IClassroomCreator>(TYPES.IClassroomCreator)
        .to(ClassroomCreator)
    bind<ClassroomCreatorArgs>(TYPES.ClassroomCreatorArgs)
        .to(ClassroomCreatorArgs)
    bind<IStudentViewCreator>(TYPES.IStudentViewCreator)
        .to(StudentViewCreator)
    bind<StudentViewCreatorArgs>(TYPES.StudentViewCreatorArgs)
        .to(StudentViewCreatorArgs)
    bind<ITeacherViewCreator>(TYPES.ITeacherViewCreator)
        .to(TeacherViewCreator)
    bind<TeacherViewCreatorArgs>(TYPES.TeacherViewCreatorArgs)
        .to(TeacherViewCreatorArgs)
    bind<ITopicCreator>(TYPES.ITopicCreator)
        .to(TopicCreator)
    bind<TopicCreatorArgs>(TYPES.TopicCreatorArgs)
        .to(TopicCreatorArgs)
    bind<IHeaderCreator>(TYPES.IHeaderCreator)
        .to(HeaderCreator)
    bind<HeaderCreatorArgs>(TYPES.HeaderCreatorArgs)
        .to(HeaderCreatorArgs)
})
export const app
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IApp>(TYPES.IApp)
        .to(App)
    bind<AppArgs>(TYPES.AppArgs)
        .to(AppArgs)
    bind<IVueConfigurer>(TYPES.IVueConfigurer)
        .to(VueConfigurer)
    bind<VueConfigurerArgs>(TYPES.VueConfigurerArgs)
        .to(VueConfigurerArgs)
    bind<IDataSubscriber>(TYPES.IDataSubscriber)
        .to(DataSubscriber)
    bind<DataSubscriberArgs>(TYPES.DataSubscriberArgs)
        .to(DataSubscriberArgs)
    const store = new AppStore(appStoreArgs) as Store<any>
    bind<Store<any>>(TYPES.Store)
        .toConstantValue(store)
})
export function myContainerLoadAllModules() {
    myContainer.load(app)
    myContainer.load(references)
    myContainer.load(components)
}

