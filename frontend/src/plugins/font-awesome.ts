import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faPepperHot, faBell as faBellSolid , faComments, faSliders, faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faBell as faBellRegular} from "@fortawesome/free-regular-svg-icons";


library.add(
	faPepperHot,
	faBellSolid,
	faBellRegular,
	faComments,
	faSliders,
	faUser,
	faRightFromBracket
);

export {FontAwesomeIcon};