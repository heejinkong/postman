# Rest API Platform UI 설계 프로젝트
프로젝트 목표: 통합문서뷰어통합 테스트 개선


## 프로젝트 개요
이 프로젝트는 Rest API Platform의 UI 설계와 기본 기능을 구현하는 것을 목표로 하며, Postman API Platform과 유사한 사용자 경험을 제공합니다. 
주요 목표는 요구사항을 기반으로 사용자가 쉽게 Workspace를 관리하고, Collection과 Request를 추가, 수정, 삭제할 수 있는 기능을 구현하는 것입니다.

<img width="1710" alt="스크린샷 2024-08-12 오전 9 50 04" src="https://github.com/user-attachments/assets/46da80fc-5355-46b8-9927-bb646c291c76">



## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [UI 설계 및 기능 구현](#ui-설계-및-기능-구현)
   - [Workspace UI](#workspace-ui)
   - [Collection 및 Folder UI](#collection-및-folder-ui)
   - [Request UI](#request-ui)
3. [기본 기능 구현](#기본-기능-구현)
   - [Workspace 관리 기능](#workspace-관리-기능)
   - [Collection 및 Folder 관리 기능](#collection-및-folder-관리-기능)
   - [Request 관리 기능](#request-관리-기능)
4. [기능 확장 및 테스트](#기능-확장-및-테스트)
5. [참조 자료](#참조-자료)



## 1. 컴포넌트 기본 UI 설계 및 기능 구현

### Workspace UI
- **Task 1: Workspace UI 구현**
  - Workspace 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'New' 버튼: 새로운 Workspace를 생성하는 기능을 제공합니다.
  - 'Import' 버튼: Workspace JSON 파일을 불러오는 기능을 제공합니다.
  - 'Export' 버튼: 작성된 내용을 JSON 파일로 저장하는 기능을 제공합니다.


### Collection 및 Folder UI
- **Task 2: Collection 및 Folder UI 구현**
  - Collection 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'Collection 추가' 버튼: 새로운 Collection을 생성하는 기능을 제공합니다.
  - Context 메뉴: Collection 아이콘을 클릭 시, Move, Add Folder, Add Request, Delete, Run 메뉴가 표시됩니다.
  - Collection 및 Folder의 이름과 설명 입력 및 저장 기능을 추가합니다.
  - 위치 정보 표시 기능을 추가합니다.


### Request UI
- **Task 3: Request UI 구현**
  - Request 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'Request 추가' 버튼: 새로운 Request를 생성하는 기능을 제공합니다.
  - Request 이름 입력 및 HTTP 메서드 선택 기능을 추가합니다.
  - Params, Headers, Body로 구성된 Request 탭을 구현합니다.
  - Params 탭에서 매개변수 추가 및 삭제 기능을 제공합니다.
  - Body 탭에서 form-data와 raw type 변경 기능을 제공합니다.


## 2. 기본 기능 구현

### Workspace 관리 기능
- 사용자는 Workspaces를 생성할 수 있습니다.
  <img width="546" alt="스크린샷 2024-08-12 오전 10 09 30" src="https://github.com/user-attachments/assets/a170f656-806e-419c-9c7c-86e2d562bc1d">

- **Task 1: 'New' 버튼 기능 개발**
  - 사용자가 새로운 Workspace를 추가할 수 있는 기능을 개발합니다.
  
- **Task 2: 'Import' 버튼 기능 개발**
  - 사용자가 Workspace JSON 파일을 불러올 수 있는 기능을 개발합니다. 파일 선택 다이얼로그와 파일 처리 로직을 구현합니다.

- **Task 3: 'Export' 버튼 기능 개발**
  - 작성된 내용을 JSON 파일로 내보내는 기능을 개발합니다. Export 버튼을 누르면 JSON 파일로 저장하는 로직을 구현합니다.

<img width="550" alt="스크린샷 2024-08-12 오전 10 07 06" src="https://github.com/user-attachments/assets/41c671b9-a8d5-4846-a987-fd34833566c9">


  
### Collection 및 Folder 관리 기능
- 사용자는 Collection과 Folder를 추가하여 작업을 계층적으로 분류할 수 있습니다.
- New Collection은 목록에 추가되어 작업들을 더 효율적으로 관리할 수 있습니니다.
  <img width="495" alt="스크린샷 2024-08-12 오전 10 10 45" src="https://github.com/user-attachments/assets/9475ee6e-cdb2-43b7-83f3-2914e616e647">

- 왼쪽 메뉴에서 Collection, Folder을 선택했을 경우
![image](https://github.com/user-attachments/assets/0e086059-e24c-4a46-a2ae-d121f115a3e2)


- **Task 1: 'Collection 추가' 버튼 개발**
  - 사용자가 새로운 Collection을 추가할 수 있는 기능을 개발합니다. 버튼 클릭으로 새로운 Collection을 생성하는 로직을 구현합니다.

- **Task 2: Context 메뉴 기능 개발**
  - Collection의 아이콘을 클릭하면 Context 메뉴가 나타나는 기능을 개발합니다. Move, Add Folder, Add Request, Delete, Run 메뉴를 보여주고 각 메뉴에 대한 로직을 구현합니다.

- **Task 3: Collection, Folder 이름 및 설명 수정 기능 추가**
  - Collection 또는 Folder의 이름과 설명을 수정할 수 있는 기능을 개발합니다. Save 버튼을 누르면 수정된 사항이 반영되는 로직을 구현합니다.

### Request 관리 기능
- Collection을 선택한 후 "Request 추가" 버튼을 눌러 새로운 Request를 생성합니다.
- 사용자는 Request의 이름을 입력하고 다양한 HTTP 메서드(GET, POST, PUT, PATCH, DELETE)를 사용하여 Request를 추가할 수 있습니다.
  <img width="617" alt="스크린샷 2024-08-12 오전 10 14 43" src="https://github.com/user-attachments/assets/0c5b5886-1c6c-482d-9d0e-8d9bd3a4c228">
- Params탭 클릭시 , 매개변수 리스트는 항상 1개 이상 여유롭게 노출되어 사용자가 변수를 추가할 수 있게 합니다.
  <img width="493" alt="스크린샷 2024-08-12 오전 10 16 15" src="https://github.com/user-attachments/assets/6d46fee4-0996-4c4d-a093-0556a66e7ea0">
- Body탭 클릭시
  <img width="524" alt="스크린샷 2024-08-12 오전 10 16 47" src="https://github.com/user-attachments/assets/093b5db5-caa9-4844-b8dd-f95885accbc5">
- Result탭 클릭시, 요청 결과로 예상되는 값을 저장해두는 textarea로 구성됩니다.
  <img width="321" alt="스크린샷 2024-08-12 오전 10 17 32" src="https://github.com/user-attachments/assets/6bf6ae15-471d-4564-a4bc-db9a788b893b">

- **Task 1: 'Request 추가' 버튼 개발**
  - Collection을 선택한 후 새로운 Request를 생성하는 기능을 개발합니다. Request의 이름과 HTTP 메서드 선택 기능을 구현합니다.

- **Task 2: Params, Headers, Body 구성**
  - Params, Headers, Body 탭으로 구성된 Request 요소들을 개발합니다. Params 탭은 매개변수를 추가하고 삭제할 수 있는 기능을 구현합니

  - Body 탭은 form-data 및 raw 형태의 데이터를 지원하며, content-type에 따라 동적으로 변경되는 기능을 구현합니다.

- **Task 3: Request 결과값 예측 기능**
  - 예상되는 ResponseBody 값을 저장해두는 textarea를 개발합니다. Request 탭과 함께 구성되며 결과값을 저장하고 비교하는 기능을 구현합니다.

## 기능 확장 및 테스트

### HTTP 통신 및 기능 확장
- Axios를 활용하여 GET 방식 이외의 POST, PUT, PATCH, DELETE 등 다양한 HTTP 메서드를 사용할 수 있도록 기능을 확장합니다. Request 요청 및 응답 데이터 처리 개선을 진행합니다.

### JSON 파일 입출력 및 순서 변경 기능
- Workspace와 Collection 정보를 JSON 파일로 import/export 기능을 추가합니다. 왼쪽 Tree에서 순서 변경이 가능하도록 기능을 추가합니다.
  <img width="233" alt="스크린샷 2024-08-12 오전 10 21 40" src="https://github.com/user-attachments/assets/a5720bd5-9665-4766-b487-c0b26e0d5ac1">



### ResponseBody 예상 값 저장 및 비교 기능 구현
- 예상되는 ResponseBody를 미리 저장하고 결과와 비교하여 Result diff탭에서 동일한지 확인하는 기능을 구현합니다. UI에서 비교 결과를 강조하여 표시하는 기능을 추가합니다.
  - Result diff탭은 위에서 저장한 Result 값이 있을 경우에만 노출됩니다.
    <img width="648" alt="스크린샷 2024-08-12 오전 10 23 37" src="https://github.com/user-attachments/assets/0b18c75d-ab71-45f8-ae17-463517f66a1d">
    <img width="657" alt="스크린샷 2024-08-12 오전 10 35 45" src="https://github.com/user-attachments/assets/22ccd492-dbb9-43e3-bd71-589b60580491">

   

### Run History 사용자가 실행한 기록 확인 기능 구현
- 사용자는 run을 실행 했던 기록을 시간별/단위별로 확인 가능합니다.
<img width="485" alt="스크린샷 2024-08-12 오전 10 36 43" src="https://github.com/user-attachments/assets/c1247ab6-8787-4b70-ab97-21dfd8ea72a1">

- Run Workspace 클릭시, Workspace의 하위 폴더 실행 결과 확인 가능하며 Run collection 했던 결과와 Run requests 했던 결과 확인 가능합니다.
<img width="328" alt="스크린샷 2024-08-12 오전 10 40 36" src="https://github.com/user-attachments/assets/8f632470-aae6-4909-9ba5-f4dc83cade4b">

- Run History 클릭시 (Run Workspace와 동일한 페이지), Run total 버튼을 누르면 현재까지 실행했던 Run 결과를 확인 가능합니다.
  <img width="340" alt="스크린샷 2024-08-12 오전 10 41 54" src="https://github.com/user-attachments/assets/ea26fd82-0f1b-4503-9d14-387be4dacd4c">
  
- Run Collection & Send Requests 실행시
  - Run 결과 페이지로 확인 가능
  - Run 기능을 실행한 시간이 화면에 출력
  - Path 형태로 보여짐(Workspace 1 / Collection 1/ Request 1)
    <img width="530" alt="스크린샷 2024-08-12 오전 10 43 49" src="https://github.com/user-attachments/assets/e6d453ca-ecc5-4281-89a3-8776f8b94055">
    
- 결과 확인 버튼 클릭시
  - 모달창으로 결과 값 노출 (예상 값 있을 경우 & 예상 값 없을 경우)
    <img width="325" alt="스크린샷 2024-08-12 오전 10 44 43" src="https://github.com/user-attachments/assets/bb446944-f619-4ed3-b79d-7c30617f4e13">

    




### 테스트 및 마무리
- 테스트 환경에서 각 기능을 테스트하고 버그 및 예외 상황을 해결하는 작업을 수행합니다.
- 추가적인 요구사항이나 기능 개발이 필요한 경우 해당 기능을 구현합니다.
- UI 디자인 최적화 및 반응형 디자인을 적용하고, 컴포넌트 분리 및 코드 리팩토링으로 성능을 개선합니다.

## 참조 자료
- [JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)
- [Postman API Platform](https://www.postman.com/)
