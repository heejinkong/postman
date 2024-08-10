# Rest API Platform UI 설계 프로젝트

이 프로젝트는 Postman API Platform을 기반으로 한 UI 설계 및 기본 기능 구현을 목표로 합니다. Workspace, Collection, Request 관리와 관련된 다양한 기능을 제공합니다.

![Project UI Design]<img width="473" alt="스크린샷 2024-08-10 오후 6 44 51" src="https://github.com/user-attachments/assets/0143ceb2-f484-4ef4-b8c3-fa0b3ecf3c48">


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

## 프로젝트 개요
이 프로젝트는 Rest API Platform의 UI 설계와 기본 기능을 구현하는 것을 목표로 하며, Postman API Platform과 유사한 사용자 경험을 제공합니다. 주요 목표는 사용자가 쉽게 Workspace를 관리하고, Collection과 Request를 추가, 수정, 삭제할 수 있는 기능을 구현하는 것입니다.

## UI 설계 및 기능 구현

### Workspace UI
- **Task 1: Workspace UI 구현**
  - Workspace 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'New' 버튼: 새로운 Workspace를 생성하는 기능을 제공합니다.
  - 'Import' 버튼: Workspace JSON 파일을 불러오는 기능을 제공합니다.
  - 'Export' 버튼: 작성된 내용을 JSON 파일로 저장하는 기능을 제공합니다.

![Workspace UI Design](path_to_image/workspace_ui.png)

### Collection 및 Folder UI
- **Task 2: Collection 및 Folder UI 구현**
  - Collection 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'Collection 추가' 버튼: 새로운 Collection을 생성하는 기능을 제공합니다.
  - Context 메뉴: Collection 아이콘을 클릭 시, Move, Add Folder, Add Request, Delete, Run 메뉴가 표시됩니다.
  - Collection 및 Folder의 이름과 설명 입력 및 저장 기능을 추가합니다.
  - 위치 정보 표시 기능을 추가합니다.

![Collection UI Design](path_to_image/collection_ui.png)

### Request UI
- **Task 3: Request UI 구현**
  - Request 레이아웃 구성 및 UI 디자인 작업을 진행합니다.
  - 'Request 추가' 버튼: 새로운 Request를 생성하는 기능을 제공합니다.
  - Request 이름 입력 및 HTTP 메서드 선택 기능을 추가합니다.
  - Params, Headers, Body로 구성된 Request 탭을 구현합니다.
  - Params 탭에서 매개변수 추가 및 삭제 기능을 제공합니다.
  - Body 탭에서 form-data와 raw type 변경 기능을 제공합니다.

![Request UI Design](path_to_image/request_ui.png)

## 기본 기능 구현

### Workspace 관리 기능
- **Task 1: 'New' 버튼 기능 개발**
  - 사용자가 새로운 Workspace를 추가할 수 있는 기능을 개발합니다.
  
- **Task 2: 'Import' 버튼 기능 개발**
  - 사용자가 Workspace JSON 파일을 불러올 수 있는 기능을 개발합니다. 파일 선택 다이얼로그와 파일 처리 로직을 구현합니다.

- **Task 3: 'Export' 버튼 기능 개발**
  - 작성된 내용을 JSON 파일로 내보내는 기능을 개발합니다. Export 버튼을 누르면 JSON 파일로 저장하는 로직을 구현합니다.

### Collection 및 Folder 관리 기능
- **Task 1: 'Collection 추가' 버튼 개발**
  - 사용자가 새로운 Collection을 추가할 수 있는 기능을 개발합니다. 버튼 클릭으로 새로운 Collection을 생성하는 로직을 구현합니다.

- **Task 2: Context 메뉴 기능 개발**
  - Collection의 아이콘을 클릭하면 Context 메뉴가 나타나는 기능을 개발합니다. Move, Add Folder, Add Request, Delete, Run 메뉴를 보여주고 각 메뉴에 대한 로직을 구현합니다.

- **Task 3: Collection, Folder 이름 및 설명 수정 기능 추가**
  - Collection 또는 Folder의 이름과 설명을 수정할 수 있는 기능을 개발합니다. Save 버튼을 누르면 수정된 사항이 반영되는 로직을 구현합니다.

### Request 관리 기능
- **Task 1: 'Request 추가' 버튼 개발**
  - Collection을 선택한 후 새로운 Request를 생성하는 기능을 개발합니다. Request의 이름과 HTTP 메서드 선택 기능을 구현합니다.

- **Task 2: Params, Headers, Body 구성**
  - Params, Headers, Body 탭으로 구성된 Request 요소들을 개발합니다. Params 탭은 매개변수를 추가하고 삭제할 수 있는 기능을 구현합니다.
  - Body 탭은 form-data 및 raw 형태의 데이터를 지원하며, content-type에 따라 동적으로 변경되는 기능을 구현합니다.

- **Task 3: Request 결과값 예측 기능**
  - 예상되는 ResponseBody 값을 저장해두는 textarea를 개발합니다. Request 탭과 함께 구성되며 결과값을 저장하고 비교하는 기능을 구현합니다.

## 기능 확장 및 테스트

### HTTP 통신 및 기능 확장
- Axios를 활용하여 GET 방식 이외의 POST, PUT, PATCH, DELETE 등 다양한 HTTP 메서드를 사용할 수 있도록 기능을 확장합니다. Request 요청 및 응답 데이터 처리 개선을 진행합니다.

### JSON 파일 입출력 및 순서 변경 기능
- Workspace와 Collection 정보를 JSON 파일로 import/export 기능을 추가합니다. 왼쪽 Tree에서 순서 변경이 가능하도록 기능을 추가합니다.

### ResponseBody 예상 값 저장 및 비교 기능 구현
- 예상되는 ResponseBody를 미리 저장하고 결과와 비교하여 동일한지 확인하는 기능을 구현합니다. UI에서 비교 결과를 강조하여 표시하는 기능을 추가합니다.

### 테스트 및 마무리
- 테스트 환경에서 각 기능을 테스트하고 버그 및 예외 상황을 해결하는 작업을 수행합니다.
- 추가적인 요구사항이나 기능 개발이 필요한 경우 해당 기능을 구현합니다.
- UI 디자인 최적화 및 반응형 디자인을 적용하고, 컴포넌트 분리 및 코드 리팩토링으로 성능을 개선합니다.

## 참조 자료
- [JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)
- [Postman API Platform](https://www.postman.com/)
