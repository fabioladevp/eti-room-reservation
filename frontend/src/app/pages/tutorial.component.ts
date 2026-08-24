import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LanguageService } from '../core/language.service';
import { Role } from '../core/models';

interface TutorialStep {
  title: {fr:string;en:string};
  description: {fr:string;en:string};
  path?: string;
  action?: {fr:string;en:string};
}

interface RoleTutorial {
  eyebrow: {fr:string;en:string};
  title: {fr:string;en:string};
  intro: {fr:string;en:string};
  mission: {fr:string;en:string};
  steps: TutorialStep[];
  tips: Array<{fr:string;en:string}>;
}

@Component({standalone:true,imports:[RouterLink],template:`
<header class="page-head tutorial-head">
  <div><p class="eyebrow">{{text(tutorial.eyebrow)}}</p><h1>{{text(tutorial.title)}}</h1><p>{{text(tutorial.intro)}}</p></div>
  <span class="tutorial-role">{{roleLabel}}</span>
</header>

<section class="panel tutorial-mission">
  <span class="tutorial-mission-icon" aria-hidden="true">?</span>
  <div><b>{{language.text('Votre rôle dans le processus','Your role in the process')}}</b><p>{{text(tutorial.mission)}}</p></div>
</section>

<section class="panel tutorial-player" [attr.aria-label]="language.text('Tutoriel interactif','Interactive tutorial')">
  <div class="tutorial-player-top">
    <div><span>{{language.text('Progression','Progress')}}</span><b>{{currentStep+1}} / {{tutorial.steps.length}}</b></div>
    <div class="tutorial-progress" role="progressbar" [attr.aria-valuenow]="currentStep+1" aria-valuemin="1" [attr.aria-valuemax]="tutorial.steps.length"><i [style.width.%]="progress"></i></div>
    <div class="tutorial-dots" [attr.aria-label]="language.text('Choisir une étape','Choose a step')">@for(step of tutorial.steps;track step.title.fr;let index=$index){<button type="button" [class.active]="index===currentStep" (click)="goTo(index)" [attr.aria-label]="language.text('Étape','Step')+' '+(index+1)" [attr.aria-current]="index===currentStep?'step':null"></button>}</div>
  </div>

  <div class="tutorial-player-layout">
    <nav class="tutorial-step-list" [attr.aria-label]="language.text('Sommaire du tutoriel','Tutorial contents')">
      @for(step of tutorial.steps;track step.title.fr;let index=$index){
        <button type="button" [class.active]="index===currentStep" [class.completed]="index<currentStep" (click)="goTo(index)">
          <span>{{stepMarker(index)}}</span><div><small>{{language.text('Étape','Step')}} {{index+1}}</small><b>{{text(step.title)}}</b></div>
        </button>
      }
    </nav>

    <article class="tutorial-slide" aria-live="polite">
      <div class="tutorial-visual" [attr.data-scene]="currentVisual">
        <div class="tutorial-mock-window">
          <div class="tutorial-mock-top"><i></i><i></i><i></i><span>ETI · {{visualSection}}</span></div>
          <div class="tutorial-mock-body">
            <div class="tutorial-mock-nav"><i></i><i></i><i></i><i></i></div>
            <div class="tutorial-mock-content">
              <div class="tutorial-mock-title"><span>{{visualIcon}}</span><div><small>{{roleLabel}}</small><b>{{text(current.title)}}</b></div></div>
              <div class="tutorial-mock-metrics"><i></i><i></i><i></i></div>
              <div class="tutorial-mock-panel"><span></span><span></span><span></span><span></span></div>
              <div class="tutorial-mock-action"><i></i><b>{{visualAction}}</b></div>
            </div>
          </div>
        </div>
        <span class="tutorial-visual-caption">{{language.text('Aperçu de l’écran','Screen preview')}}</span>
      </div>

      <div class="tutorial-slide-copy">
        <span class="tutorial-slide-count">{{language.text('ÉTAPE','STEP')}} {{currentStep+1}}</span>
        <h2>{{text(current.title)}}</h2><p>{{text(current.description)}}</p>
        <div class="tutorial-focus"><span aria-hidden="true">✓</span><div><b>{{language.text('À faire','What to do')}}</b><small>{{focusText}}</small></div></div>
        @if(current.path&&current.action){<a class="btn primary tutorial-action" [routerLink]="current.path">{{text(current.action)}} <span aria-hidden="true">→</span></a>}
      </div>
    </article>
  </div>

  <footer class="tutorial-controls">
    <button type="button" class="tutorial-arrow previous" (click)="previous()" [disabled]="currentStep===0"><span aria-hidden="true">←</span><div><small>{{language.text('Précédent','Previous')}}</small><b>{{previousLabel}}</b></div></button>
    <span class="tutorial-keyboard-hint">{{language.text('Utilisez aussi les flèches du clavier','You can also use the keyboard arrows')}}</span>
    <button type="button" class="tutorial-arrow next" (click)="next()"><div><small>{{currentStep===tutorial.steps.length-1?language.text('Recommencer','Start again'):language.text('Suivant','Next')}}</small><b>{{nextLabel}}</b></div><span aria-hidden="true">→</span></button>
  </footer>
</section>

<section class="panel tutorial-tips">
  <div class="panel-head"><div><h2>{{language.text('Bonnes pratiques','Best practices')}}</h2><p>{{language.text('À retenir pour utiliser efficacement la plateforme','Key points for using the platform effectively')}}</p></div></div>
  <ul>@for(tip of tutorial.tips;track tip.fr){<li><span aria-hidden="true">✓</span>{{text(tip)}}</li>}</ul>
</section>

<section class="panel tutorial-common">
  <h2>{{language.text('Fonctions disponibles pour tous','Features available to everyone')}}</h2>
  <div><span>FR / EN</span><p>{{language.text('Changez la langue depuis la barre supérieure.','Change the language from the top bar.')}}</p></div>
  <div><span>🔔</span><p>{{language.text('Consultez les notifications : leur pastille disparaît dès l’ouverture de l’onglet.','Open notifications: their badge disappears as soon as the tab is viewed.')}}</p></div>
  <div><span>?</span><p>{{language.text('Revenez à ce tutoriel à tout moment depuis l’espace de travail.','Return to this tutorial at any time from the workspace.')}}</p></div>
</section>`})
export class TutorialComponent {
  private auth=inject(AuthService);
  language=inject(LanguageService);
  private role=this.auth.role()??'USER';
  currentStep=0;

  private tutorials:Record<Role,RoleTutorial>={
    USER:{
      eyebrow:{fr:'TUTORIEL DEMANDEUR',en:'REQUESTER TUTORIAL'},title:{fr:'Organiser et suivre une réunion',en:'Organize and track a meeting'},
      intro:{fr:'Ce guide vous accompagne de la création de la demande jusqu’au questionnaire de satisfaction.',en:'This guide takes you from creating a request through to the satisfaction survey.'},
      mission:{fr:'Exprimer précisément le besoin, suivre son traitement et évaluer la prestation après la réunion.',en:'Describe the requirement accurately, track its processing and evaluate the service after the meeting.'},
      steps:[
        {title:{fr:'Créer une demande',en:'Create a request'},description:{fr:'Indiquez l’objet, le nombre de participants, les dates, les horaires et la disposition. Pour plusieurs jours, choisissez des horaires identiques ou précisez-les date par date.',en:'Enter the subject, number of participants, dates, times and layout. For several days, use common times or set them date by date.'},path:'/nouvelle-demande',action:{fr:'Créer une demande',en:'Create a request'}},
        {title:{fr:'Préciser les besoins',en:'Specify requirements'},description:{fr:'Sélectionnez les besoins techniques et décrivez les contraintes physiques. Ces informations servent à trouver une salle réellement compatible.',en:'Select technical requirements and describe physical constraints. This information is used to find a genuinely compatible room.'}},
        {title:{fr:'Suivre la réservation',en:'Track the reservation'},description:{fr:'Consultez le statut, la salle assignée et les notifications. Vous pouvez annuler une demande encore active avec un motif.',en:'Check the status, assigned room and notifications. You can cancel an active request by providing a reason.'},path:'/mes-demandes',action:{fr:'Voir mes demandes',en:'View my requests'}},
        {title:{fr:'Donner votre avis à J+1',en:'Give feedback on D+1'},description:{fr:'Le lendemain de la dernière occurrence, le questionnaire devient disponible. Seuls les critères pertinents doivent être notés, puis ajoutez la note globale sur 5.',en:'The day after the last occurrence, the survey becomes available. Rate only relevant criteria, then add the overall score out of 5.'},path:'/feedbacks',action:{fr:'Accéder aux feedbacks',en:'Open feedback'}}
      ],
      tips:[{fr:'Vérifiez les dates et les horaires avant l’envoi.',en:'Check dates and times before submitting.'},{fr:'Décrivez clairement les équipements indispensables.',en:'Clearly describe essential equipment.'},{fr:'Surveillez les notifications pour suivre les validations.',en:'Watch notifications to track approvals.'}]
    },
    ADMIN:{
      eyebrow:{fr:'TUTORIEL ADMINISTRATEUR',en:'ADMINISTRATOR TUTORIAL'},title:{fr:'Administrer les réservations et le référentiel',en:'Manage reservations and master data'},
      intro:{fr:'Ce guide présente le traitement des demandes, l’administration des salles et le suivi global de la plateforme.',en:'This guide covers request processing, room administration and overall platform monitoring.'},
      mission:{fr:'Garantir une assignation compatible, maintenir les données à jour et superviser l’activité de tous les acteurs.',en:'Ensure compatible assignments, keep data up to date and oversee the activity of all actors.'},
      steps:[
        {title:{fr:'Piloter depuis le tableau de bord',en:'Monitor from the dashboard'},description:{fr:'Consultez les indicateurs, les demandes récentes, le taux d’occupation et les salles les plus fréquemment assignées.',en:'Review metrics, recent requests, occupancy rate and the most frequently assigned rooms.'},path:'/tableau-de-bord',action:{fr:'Ouvrir le tableau de bord',en:'Open dashboard'}},
        {title:{fr:'Vérifier et assigner une salle',en:'Check and assign a room'},description:{fr:'Ouvrez une demande, lancez la vérification de compatibilité puis assignez une salle disponible. Une demande peut également être rendue prioritaire.',en:'Open a request, run the compatibility check and assign an available room. A request can also be marked as priority.'},path:'/administration/demandes',action:{fr:'Gérer les demandes',en:'Manage requests'}},
        {title:{fr:'Administrer les ressources',en:'Manage resources'},description:{fr:'Créez ou modifiez les salles, leurs photos, capacités et équipements. Une suppression de salle exige un justificatif.',en:'Create or update rooms, photos, capacities and equipment. Deleting a room requires a reason.'},path:'/salles',action:{fr:'Gérer les salles',en:'Manage rooms'}},
        {title:{fr:'Gérer les utilisateurs',en:'Manage users'},description:{fr:'Créez, modifiez ou supprimez les comptes. Chaque opération sensible exige votre mot de passe administrateur et les suppressions demandent une confirmation.',en:'Create, update or delete accounts. Each sensitive operation requires your administrator password and deletions require confirmation.'},path:'/administration/utilisateurs',action:{fr:'Gérer les utilisateurs',en:'Manage users'}},
        {title:{fr:'Contrôler et analyser',en:'Review and analyze'},description:{fr:'Consultez les feedbacks par réservation, exportez les rapports et utilisez le journal d’audit pour retracer les actions.',en:'Review feedback by reservation, export reports and use the audit log to trace actions.'},path:'/rapports',action:{fr:'Voir les rapports',en:'View reports'}}
      ],
      tips:[{fr:'N’assignez que les salles indiquées comme compatibles.',en:'Only assign rooms shown as compatible.'},{fr:'Justifiez les suppressions et les annulations de manière précise.',en:'Give precise reasons for deletions and cancellations.'},{fr:'Contrôlez régulièrement les équipements et les comptes actifs.',en:'Regularly review equipment and active accounts.'}]
    },
    FACILITY:{
      eyebrow:{fr:'TUTORIEL FACILITY',en:'FACILITY TUTORIAL'},title:{fr:'Valider les conditions physiques',en:'Approve physical arrangements'},
      intro:{fr:'Ce guide explique comment contrôler la disposition, le mobilier, l’accessibilité et les conditions de la salle.',en:'This guide explains how to check layout, furniture, accessibility and room conditions.'},
      mission:{fr:'Confirmer que la salle et son aménagement répondent aux besoins physiques de chaque réservation.',en:'Confirm that the room and its setup meet the physical needs of each reservation.'},
      steps:[
        {title:{fr:'Consulter la file de validation',en:'Open the approval queue'},description:{fr:'Les demandes qui vous sont destinées apparaissent dans la file Facility avec la salle, la disposition et les besoins physiques.',en:'Requests assigned to you appear in the Facility queue with the room, layout and physical requirements.'},path:'/validations/facility',action:{fr:'Voir les validations',en:'View approvals'}},
        {title:{fr:'Contrôler la salle',en:'Check the room'},description:{fr:'Vérifiez la capacité, la disposition, le mobilier, l’accessibilité et la climatisation avant de prendre une décision.',en:'Check capacity, layout, furniture, accessibility and air conditioning before deciding.'},path:'/salles',action:{fr:'Consulter les salles',en:'View rooms'}},
        {title:{fr:'Valider ou rejeter',en:'Approve or reject'},description:{fr:'Ajoutez un commentaire utile. En cas de rejet, la justification est obligatoire afin que l’administrateur puisse réassigner la demande.',en:'Add a useful comment. A reason is mandatory when rejecting so the administrator can reassign the request.'}},
        {title:{fr:'Analyser les retours',en:'Review feedback'},description:{fr:'Consultez les feedbacks associés aux réservations pour identifier les améliorations concernant le cadre et les services.',en:'Review reservation feedback to identify improvements related to the venue and services.'},path:'/feedbacks',action:{fr:'Voir les feedbacks',en:'View feedback'}}
      ],
      tips:[{fr:'Vérifiez chaque occurrence d’une réservation multi-jours.',en:'Check every occurrence of a multi-day reservation.'},{fr:'Décrivez précisément la cause d’un rejet.',en:'Describe the reason for a rejection precisely.'},{fr:'Consultez le planning avant toute validation.',en:'Check the schedule before approving.'}]
    },
    IT:{
      eyebrow:{fr:'TUTORIEL PERSONNEL IT',en:'IT STAFF TUTORIAL'},title:{fr:'Valider les moyens techniques',en:'Approve technical resources'},
      intro:{fr:'Ce guide présente le contrôle des équipements et des besoins techniques associés aux réservations.',en:'This guide covers equipment checks and technical requirements associated with reservations.'},
      mission:{fr:'Garantir la disponibilité et l’adéquation des équipements techniques pour chaque réunion.',en:'Ensure technical equipment is available and suitable for every meeting.'},
      steps:[
        {title:{fr:'Consulter la file IT',en:'Open the IT queue'},description:{fr:'Les demandes à contrôler affichent la salle assignée ainsi que les besoins Wi-Fi, projection, sonorisation, visioconférence ou interprétation.',en:'Requests to review show the assigned room and Wi-Fi, projection, sound, video conferencing or interpretation needs.'},path:'/validations/it',action:{fr:'Voir les validations IT',en:'View IT approvals'}},
        {title:{fr:'Vérifier les équipements',en:'Check equipment'},description:{fr:'Contrôlez les équipements fixes de la salle et les quantités d’équipements mobiles disponibles pour toutes les occurrences.',en:'Check the room’s fixed equipment and available quantities of mobile equipment for all occurrences.'},path:'/equipements',action:{fr:'Gérer les équipements',en:'Manage equipment'}},
        {title:{fr:'Valider ou rejeter',en:'Approve or reject'},description:{fr:'Validez si tous les moyens sont disponibles. En cas de rejet, indiquez clairement le matériel manquant ou la contrainte technique.',en:'Approve when all resources are available. If rejecting, clearly identify missing equipment or the technical constraint.'}},
        {title:{fr:'Exploiter les feedbacks',en:'Use feedback'},description:{fr:'Analysez les notes sur la connexion réseau et l’audiovisuel afin de prioriser les actions d’amélioration.',en:'Analyze network and audiovisual ratings to prioritize improvement actions.'},path:'/feedbacks',action:{fr:'Voir les feedbacks',en:'View feedback'}}
      ],
      tips:[{fr:'Contrôlez les quantités mobiles sur toute la période.',en:'Check mobile quantities across the entire period.'},{fr:'Maintenez le statut des équipements à jour.',en:'Keep equipment status up to date.'},{fr:'Précisez le matériel manquant lors d’un rejet.',en:'Specify missing equipment when rejecting.'}]
    }
  };

  get tutorial(){return this.tutorials[this.role]}
  get current(){return this.tutorial.steps[this.currentStep]}
  get progress(){return ((this.currentStep+1)/this.tutorial.steps.length)*100}
  get previousLabel(){return this.currentStep?this.text(this.tutorial.steps[this.currentStep-1].title):this.language.text('Début du guide','Start of guide')}
  get nextLabel(){return this.currentStep===this.tutorial.steps.length-1?this.text(this.tutorial.steps[0].title):this.text(this.tutorial.steps[this.currentStep+1].title)}
  private visualScenes:Record<Role,string[]>={USER:['form','requirements','status','rating'],ADMIN:['dashboard','assignment','rooms','users','reports'],FACILITY:['queue','rooms','approval','feedback'],IT:['queue','equipment','approval','feedback']};
  get currentVisual(){return this.visualScenes[this.role][this.currentStep]??'dashboard'}
  get visualIcon(){return ({form:'✎',requirements:'☑',status:'◷',rating:'★',dashboard:'▦',assignment:'↔',rooms:'⌂',users:'♙',reports:'↗',queue:'☷',approval:'✓',feedback:'★',equipment:'⚙'} as Record<string,string>)[this.currentVisual]??'•'}
  get visualSection(){return ({form:['Demande','Request'],requirements:['Besoins','Requirements'],status:['Suivi','Tracking'],rating:['Feedback','Feedback'],dashboard:['Tableau de bord','Dashboard'],assignment:['Assignation','Assignment'],rooms:['Salles','Rooms'],users:['Utilisateurs','Users'],reports:['Rapports','Reports'],queue:['Validations','Approvals'],approval:['Décision','Decision'],feedback:['Feedback','Feedback'],equipment:['Équipements','Equipment']} as Record<string,[string,string]>)[this.currentVisual]?.[this.language.current()==='fr'?0:1]??''}
  get visualAction(){return this.current.action?this.text(this.current.action):this.language.text('Vérifier puis continuer','Review and continue')}
  get focusText(){return this.tutorial.tips[this.currentStep%this.tutorial.tips.length] ? this.text(this.tutorial.tips[this.currentStep%this.tutorial.tips.length]) : ''}
  stepMarker(index:number){return index<this.currentStep?'✓':String(index+1)}
  goTo(index:number){if(index>=0&&index<this.tutorial.steps.length)this.currentStep=index}
  previous(){this.goTo(this.currentStep-1)}
  next(){this.currentStep=this.currentStep===this.tutorial.steps.length-1?0:this.currentStep+1}
  @HostListener('document:keydown.arrowLeft') onPreviousKey(){this.previous()}
  @HostListener('document:keydown.arrowRight') onNextKey(){this.next()}
  get roleLabel(){const labels:Record<Role,{fr:string;en:string}>={USER:{fr:'Demandeur',en:'Requester'},ADMIN:{fr:'Administrateur',en:'Administrator'},FACILITY:{fr:'Facility',en:'Facility'},IT:{fr:'Personnel IT',en:'IT staff'}};return this.text(labels[this.role])}
  text(value:{fr:string;en:string}){return value[this.language.current()]}
}
